"use strict";

const STORAGE_KEY = "fantasyDraftBoard_v6";
const LEGACY_STORAGE_KEYS = ["fantasyDraftBoard_v5", "fantasyDraftBoard_v3"];
const MASTER_PLAYERS = Array.isArray(window.starterPlayers) ? window.starterPlayers : [];
const DEFAULT_NEEDS = { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, K: 1, DST: 1, BENCH: 5 };
const VALID_STATUSES = new Set(["available", "mine", "other"]);
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const clone = value => JSON.parse(JSON.stringify(value));
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

let undoStack = [];
let selectedId = null;
let currentTab = "board";
let tagFilter = "ALL";

function normalizedName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv)\b/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function safeJson(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
}

function roundsFromNeeds(needs) {
  return Object.values(needs).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
}

function cleanNeeds(value) {
  const merged = { ...DEFAULT_NEEDS, ...(value || {}) };
  Object.keys(DEFAULT_NEEDS).forEach(key => {
    merged[key] = clamp(Math.round(Number(merged[key]) || 0), 0, key === "BENCH" ? 12 : 10);
  });
  return merged;
}

function cleanDraft(value, needs) {
  const incoming = value || {};
  const leagueSize = clamp(Math.round(Number(incoming.leagueSize) || 12), 2, 32);
  return {
    leagueSize,
    draftSlot: clamp(Math.round(Number(incoming.draftSlot) || 1), 1, leagueSize),
    currentPick: clamp(Math.round(Number(incoming.currentPick) || 1), 1, 9999),
    rounds: clamp(Math.round(Number(incoming.rounds) || roundsFromNeeds(needs) || 16), 1, 40)
  };
}

function mergePlayers(savedPlayers) {
  const byId = new Map();
  const byName = new Map();
  (Array.isArray(savedPlayers) ? savedPlayers : []).forEach(player => {
    if (player && player.id) byId.set(player.id, player);
    if (player && player.name) byName.set(normalizedName(player.name), player);
  });
  return MASTER_PLAYERS.map(master => {
    const prior = byId.get(master.id) || byName.get(normalizedName(master.name)) || {};
    return {
      ...clone(master),
      favorite: Boolean(prior.favorite),
      status: VALID_STATUSES.has(prior.status) ? prior.status : "available",
      draftedAt: Number.isFinite(Number(prior.draftedAt)) && Number(prior.draftedAt) > 0
        ? Math.round(Number(prior.draftedAt))
        : null
    };
  });
}

function makeState(raw) {
  const needs = cleanNeeds(raw?.needs);
  return {
    boardVersion: window.BOARD_VERSION || "6.0.0",
    players: mergePlayers(raw?.players),
    needs,
    draft: cleanDraft(raw?.draft, needs)
  };
}

function loadState() {
  const current = safeJson(STORAGE_KEY);
  if (current) return makeState(current);
  for (const key of LEGACY_STORAGE_KEYS) {
    const legacy = safeJson(key);
    if (legacy) return makeState(legacy);
  }
  return makeState(null);
}

let state = loadState();

function saveState() {
  state.boardVersion = window.BOARD_VERSION || "6.0.0";
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    alert("The board could not save locally. Export a backup before leaving this page.");
  }
}

function snapshot() {
  undoStack.push(clone(state));
  if (undoStack.length > 30) undoStack.shift();
  updateUndoButton();
}

function undo() {
  const previous = undoStack.pop();
  if (!previous) return;
  state = previous;
  saveState();
  syncInputs();
  renderAll();
}

function updateUndoButton() {
  const button = $("#undoBtn");
  if (button) button.disabled = undoStack.length === 0;
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function signed(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}`;
}

function currentPickNumber() {
  return clamp(Math.round(Number(state.draft.currentPick) || 1), 1, 9999);
}

function roundForPick(pick) {
  return Math.floor((Math.max(1, pick) - 1) / state.draft.leagueSize) + 1;
}

function pickInRound(pick) {
  return ((Math.max(1, pick) - 1) % state.draft.leagueSize) + 1;
}

function ownerSlotForPick(pick) {
  const round = roundForPick(pick);
  const offset = pickInRound(pick) - 1;
  return round % 2 === 1 ? offset + 1 : state.draft.leagueSize - offset;
}

function nextUserPick(startPick) {
  let pick = Math.max(1, Math.round(Number(startPick) || 1));
  for (let i = 0; i < state.draft.leagueSize * 3; i += 1, pick += 1) {
    if (ownerSlotForPick(pick) === state.draft.draftSlot) return pick;
  }
  return pick;
}

function roundPickLabel(pick) {
  return `${roundForPick(pick)}.${String(pickInRound(pick)).padStart(2, "0")}`;
}

function matchesFilters(player) {
  const query = $("#searchInput").value.trim().toLowerCase();
  const position = $("#positionFilter").value;
  const textMatch = !query || `${player.name} ${player.team} ${player.pos}`.toLowerCase().includes(query);
  const positionMatch = position === "ALL" || player.pos === position;
  let tagMatch = true;
  if (tagFilter === "SLEEPER") tagMatch = player.sleeper;
  if (tagFilter === "MYGUY") tagMatch = player.myGuy;
  if (tagFilter === "RISKY") tagMatch = player.risky;
  return textMatch && positionMatch && tagMatch;
}

function rosterCounts() {
  const counts = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DST: 0 };
  state.players.filter(player => player.status === "mine").forEach(player => {
    if (counts[player.pos] !== undefined) counts[player.pos] += 1;
  });
  return counts;
}

function lineupState() {
  const counts = rosterCounts();
  const remaining = {};
  ["QB", "RB", "WR", "TE", "K", "DST"].forEach(pos => {
    remaining[pos] = Math.max(0, state.needs[pos] - counts[pos]);
  });
  const flexExtras = ["RB", "WR", "TE"].reduce(
    (sum, pos) => sum + Math.max(0, counts[pos] - state.needs[pos]),
    0
  );
  remaining.FLEX = Math.max(0, state.needs.FLEX - flexExtras);
  const totalMine = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const rosterTarget = roundsFromNeeds(state.needs);
  remaining.ROSTER = Math.max(0, rosterTarget - totalMine);
  return { counts, remaining, totalMine, rosterTarget };
}

const projectionPercentiles = (() => {
  const result = new Map();
  ["QB", "RB", "WR", "TE", "K", "DST"].forEach(pos => {
    const group = MASTER_PLAYERS
      .filter(player => player.pos === pos && Number.isFinite(player.projection))
      .sort((a, b) => b.projection - a.projection);
    group.forEach((player, index) => {
      result.set(player.id, group.length <= 1 ? 0.5 : 1 - index / (group.length - 1));
    });
  });
  return result;
})();

function recentPositionRun(pos) {
  const current = currentPickNumber();
  return state.players.filter(player =>
    player.pos === pos &&
    player.status !== "available" &&
    Number.isFinite(player.draftedAt) &&
    player.draftedAt < current &&
    player.draftedAt >= current - 6
  ).length;
}

function logisticSurvival(pick, mean, scale) {
  const z = (pick - 0.5 - mean) / scale;
  if (z > 40) return Math.exp(-z);
  if (z < -40) return 1;
  return 1 / (1 + Math.exp(z));
}

function makeItBackEstimate(player) {
  const current = currentPickNumber();
  const next = nextUserPick(current + 1);
  const rawMean = Number(player.adp) || Number(player.expertRank) || player.rank;
  const runShift = Math.min(4, Math.max(0, recentPositionRun(player.pos) - 1) * 1.25);
  const mean = rawMean - runShift;
  const rawSd = clamp(Number(player.adpSd) || 18, 3, 45);
  const scale = Math.max(2.5, rawSd * Math.sqrt(3) / Math.PI);
  const nowSurvival = Math.max(1e-12, logisticSurvival(current, mean, scale));
  const nextSurvival = logisticSurvival(next, mean, scale);
  const pct = clamp(Math.round(100 * nextSurvival / nowSurvival), 1, 99);
  let confidence = "Medium";
  if (player.marketSource === "expert-proxy") confidence = "Low";
  else if (player.marketSource === "news-adjusted") confidence = "Medium";
  else if ((Number(player.adpSamples) || 0) >= 100) confidence = "High";
  else if ((Number(player.adpSamples) || 0) < 20) confidence = "Low";
  return {
    pct,
    next,
    label: pct >= 70 ? "WAIT" : pct <= 30 ? "DRAFT" : "TOSS-UP",
    confidence,
    runShift
  };
}

function basePlayerValue(rank) {
  const normalized = clamp((rank - 1) / Math.max(1, MASTER_PLAYERS.length - 1), 0, 1);
  return 98 - 62 * Math.pow(normalized, 0.55);
}

function rosterFitAdjustment(player) {
  const { counts, remaining } = lineupState();
  const round = roundForPick(currentPickNumber());
  if (player.pos === "K" || player.pos === "DST") {
    if (counts[player.pos] >= state.needs[player.pos]) return -20;
    return round >= Math.max(8, state.draft.rounds - 1) ? 16 : -18;
  }
  if (player.pos === "QB") {
    if (counts.QB >= state.needs.QB) return round >= state.draft.rounds - 2 ? -5 : -11;
    if (player.rank <= 75) return 3;
    return round >= 8 ? 4 : 0;
  }
  if (player.pos === "TE") {
    if (remaining.TE > 0) return player.rank <= 80 ? 7 : 5;
    return remaining.FLEX > 0 && player.rank <= 80 ? 1 : -6;
  }
  if (remaining[player.pos] > 0) return 7;
  if (remaining.FLEX > 0) return 3;
  if (remaining.ROSTER > 0) return player.pos === "RB" ? 3 : 2;
  return -8;
}

function scarcityAdjustment(player) {
  if (player.pos === "TE") {
    if (player.rank <= 40) return 4;
    if (player.rank <= 85) return 2;
  }
  if (player.pos === "QB") {
    if (player.rank <= 60) return 3;
    if (player.rank <= 100) return 1;
  }
  if (player.pos === "RB" && player.rank <= 120) return 1;
  return 0;
}

function timingAdjustment(player, back) {
  const current = currentPickNumber();
  const adp = Number(player.adp) || Number(player.expertRank) || player.rank;
  const confidenceWeight = player.marketSource === "expert-proxy" ? 0.5 : 1;
  let urgency = back.pct <= 15 ? 5 : back.pct <= 35 ? 3 : back.pct >= 85 ? -2 : 0;
  let price = 0;
  if (current - adp >= 20) price = 4;
  else if (current - adp >= 8) price = 2;
  else if (adp - current >= 36) price = -4;
  else if (adp - current >= 18) price = -2;
  return (urgency + price) * confidenceWeight;
}

function liveValueDetails(player) {
  const base = basePlayerValue(player.rank);
  const picksFallen = Math.max(0, currentPickNumber() - player.rank);
  const fall = Math.min(16, Math.log2(1 + picksFallen) * 2.2);
  const roster = rosterFitAdjustment(player);
  const scarcity = scarcityAdjustment(player);
  const percentile = projectionPercentiles.get(player.id) ?? 0.5;
  const projection = (percentile - 0.5) * 4;
  const back = makeItBackEstimate(player);
  const timing = timingAdjustment(player, back);
  let tags = 0;
  if (player.myGuy) tags += 1.5;
  if (player.sleeper) tags += 0.75;
  if (player.risky) tags -= 2.5;
  if (player.favorite) tags += 1;
  const raw = base + fall + roster + scarcity + projection + timing + tags;
  return {
    value: Math.round(clamp(raw, 1, 100)),
    base, fall, roster, scarcity, projection, timing, tags, picksFallen, back
  };
}

function marketBadge(player) {
  if (player.marketSource === "expert-proxy") return `ECR ${Math.round(player.adp)}`;
  if (player.marketSource === "news-adjusted") return `ADP~ ${Math.round(player.adp)}`;
  return `ADP ${Number(player.adp).toFixed(1)}`;
}

function tagHtml(player) {
  return [
    player.myGuy ? '<span class="tag tag-myguy">MY GUY</span>' : "",
    player.sleeper ? '<span class="tag tag-sleeper">SLEEPER</span>' : "",
    player.risky ? '<span class="tag tag-risky">RISKY</span>' : ""
  ].filter(Boolean).join("");
}

function playerCard(player) {
  const value = liveValueDetails(player).value;
  const stateClass = player.status === "mine" ? "mine-state" : player.status === "other" ? "other-state" : "";
  const statusBadge = player.status === "mine"
    ? `<span class="status-badge mine-badge">MINE${player.draftedAt ? ` • ${player.draftedAt}` : ""}</span>`
    : player.status === "other"
      ? `<span class="status-badge taken-badge">TAKEN${player.draftedAt ? ` • ${player.draftedAt}` : ""}</span>`
      : "";
  const actions = player.status === "available"
    ? `<button class="quick mine-quick" type="button">MINE</button><button class="quick taken-quick" type="button">TAKEN</button>`
    : `<button class="quick return-quick" type="button">RETURN</button>`;
  return `<article class="player ${stateClass}" data-id="${esc(player.id)}">
    <div class="rank open-sheet" role="button" tabindex="0" aria-label="Open ${esc(player.name)} details">${player.rank}</div>
    <div class="player-main open-sheet" role="button" tabindex="0">
      <div class="name-line"><span class="name">${esc(player.name)}</span>${statusBadge}</div>
      <div class="meta"><span class="pos">${esc(player.pos)}</span><span>${esc(player.team)}</span><span class="market-chip">${esc(marketBadge(player))}</span><span class="value-badge">VALUE ${value}</span></div>
      <div class="tag-row">${tagHtml(player)}</div>
    </div>
    <div class="card-actions">
      <button class="icon-btn favorite-btn ${player.favorite ? "starred" : ""}" type="button" aria-label="${player.favorite ? "Remove favorite" : "Add favorite"}">${player.favorite ? "★" : "☆"}</button>
      <div class="quick-actions">${actions}</div>
    </div>
  </article>`;
}

function renderBoard() {
  const players = state.players.filter(matchesFilters).sort((a, b) => a.rank - b.rank);
  $("#boardList").innerHTML = players.length
    ? players.map(playerCard).join("")
    : '<div class="empty">No players match those filters.</div>';
}

function renderFavorites() {
  const players = state.players.filter(player => player.favorite && matchesFilters(player)).sort((a, b) => a.rank - b.rank);
  $("#favoriteCount").textContent = `${state.players.filter(player => player.favorite).length} saved`;
  $("#favoritesList").innerHTML = players.length
    ? players.map(playerCard).join("")
    : '<div class="empty">Star players from the board to build a draft queue.</div>';
}

function renderNeeds() {
  const { remaining } = lineupState();
  const keys = ["QB", "RB", "WR", "TE", "FLEX", "K", "DST"];
  $("#needsSummary").innerHTML = keys.map(key =>
    `<span class="need ${remaining[key] > 0 ? "hot" : "done"}">${key}: ${remaining[key]}</span>`
  ).join("") + `<span class="need">Roster: ${remaining.ROSTER} open</span>`;
}

function bestCandidates() {
  const ranked = state.players
    .filter(player => player.status === "available" && matchesFilters(player))
    .map(player => ({ player, score: liveValueDetails(player).value }))
    .sort((a, b) => b.score - a.score || a.player.rank - b.player.rank);
  if ($("#positionFilter").value !== "ALL") return ranked.slice(0, 30).map(item => item.player);
  const caps = { QB: 5, RB: 20, WR: 20, TE: 6, K: 2, DST: 2 };
  const counts = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DST: 0 };
  const selected = [];
  for (const item of ranked) {
    const pos = item.player.pos;
    if (counts[pos] >= caps[pos]) continue;
    selected.push(item.player);
    counts[pos] += 1;
    if (selected.length === 30) break;
  }
  return selected;
}

function renderBest() {
  renderNeeds();
  const players = bestCandidates();
  $("#bestList").innerHTML = players.length
    ? players.map(playerCard).join("")
    : '<div class="empty">No available players match those filters.</div>';
}

function draftSort(a, b) {
  const ap = Number.isFinite(a.draftedAt) ? a.draftedAt : Number.MAX_SAFE_INTEGER;
  const bp = Number.isFinite(b.draftedAt) ? b.draftedAt : Number.MAX_SAFE_INTEGER;
  return ap - bp || a.rank - b.rank;
}

function renderRoster() {
  const players = state.players.filter(player => player.status === "mine").sort(draftSort);
  $("#myPickCount").textContent = `${players.length} picks`;
  $("#rosterList").innerHTML = players.length
    ? players.map(playerCard).join("")
    : '<div class="empty">Your picks will appear here.</div>';
}

function draftLogRow(player) {
  const pick = player.draftedAt;
  const pickText = Number.isFinite(pick) ? `#${pick}` : "#?";
  const roundText = Number.isFinite(pick) ? `R${roundPickLabel(pick)}` : "Imported pick";
  return `<div class="draft-log-row player" data-id="${esc(player.id)}">
    <div class="log-pick open-sheet" role="button" tabindex="0"><strong>${pickText}</strong><span>${roundText}</span></div>
    <div class="player-main open-sheet" role="button" tabindex="0">
      <div class="name-line"><span class="name">${esc(player.name)}</span></div>
      <div class="meta"><span class="pos">${esc(player.pos)}</span><span>${esc(player.team)}</span><span class="status-badge ${player.status === "mine" ? "mine-badge" : "taken-badge"}">${player.status === "mine" ? "MY PICK" : "TAKEN"}</span></div>
    </div>
    <button class="quick return-quick" type="button">RETURN</button>
  </div>`;
}

function renderDraftLog() {
  const players = state.players.filter(player => player.status !== "available").sort(draftSort);
  $("#draftLogCount").textContent = `${players.length} selections`;
  $("#draftLogList").innerHTML = players.length
    ? players.map(draftLogRow).join("")
    : '<div class="empty">Every marked selection will appear here in pick order.</div>';
}

function renderDraftDashboard() {
  const current = currentPickNumber();
  const round = roundForPick(current);
  const inRound = pickInRound(current);
  const owner = ownerSlotForPick(current);
  const isUser = owner === state.draft.draftSlot;
  const next = nextUserPick(current);
  const until = Math.max(0, next - current);
  $("#dashCurrentPick").textContent = String(current);
  $("#dashRound").textContent = `R${round} • ${roundPickLabel(current)}`;
  $("#dashNextPick").textContent = isUser ? "YOU'RE UP" : String(next);
  $("#dashUntil").textContent = isUser ? "Make your pick" : `${until} pick${until === 1 ? "" : "s"} away`;
  $("#draftProgressFill").style.width = `${((inRound - 1) / Math.max(1, state.draft.leagueSize - 1)) * 100}%`;
  $("#draftProgressLabel").textContent = `Round ${round} • Pick ${inRound} of ${state.draft.leagueSize}${isUser ? " • Your turn" : ""}`;
}

function bindCards() {
  $$(".favorite-btn").forEach(button => {
    button.onclick = event => {
      event.stopPropagation();
      const player = state.players.find(item => item.id === button.closest(".player").dataset.id);
      if (!player) return;
      snapshot();
      player.favorite = !player.favorite;
      saveState();
      renderAll();
    };
  });
  $$(".open-sheet").forEach(element => {
    const open = () => {
      const card = element.closest(".player");
      if (!card) return;
      selectedId = card.dataset.id;
      openSheet();
    };
    element.onclick = open;
    element.onkeydown = event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    };
  });
  $$(".mine-quick").forEach(button => button.onclick = event => {
    event.stopPropagation();
    selectedId = button.closest(".player").dataset.id;
    setStatus("mine");
  });
  $$(".taken-quick").forEach(button => button.onclick = event => {
    event.stopPropagation();
    selectedId = button.closest(".player").dataset.id;
    setStatus("other");
  });
  $$(".return-quick").forEach(button => button.onclick = event => {
    event.stopPropagation();
    selectedId = button.closest(".player").dataset.id;
    setStatus("available");
  });
}

function marketSourceLabel(player) {
  if (player.marketSource === "news-adjusted") return "News-adjusted market estimate";
  if (player.marketSource === "expert-proxy") return "Expert-rank proxy • low-data";
  return `${Number(player.adpSamples) || 0} recent 12-team drafts`;
}

function rankSource(value) {
  return Number.isFinite(Number(value)) ? `#${Math.round(Number(value))}` : "—";
}

function openSheet() {
  const player = state.players.find(item => item.id === selectedId);
  if (!player) return;
  const details = liveValueDetails(player);
  const back = details.back;
  const projectionLabel = `${Number(player.projection).toFixed(1)} PPR`;
  const injury = player.injuryStatus && player.injuryStatus !== "ACTIVE"
    ? `<span class="injury-badge">${esc(player.injuryStatus.replaceAll("_", " "))}</span>`
    : "";
  $("#sheetPlayer").innerHTML = `
    <div class="detail-title-row"><div><div class="detail-title">${esc(player.name)}</div><div class="detail-sub">${esc(player.pos)} • ${esc(player.team)} ${injury}</div></div><span class="detail-rank">#${player.rank}</span></div>
    <div class="detail-tags">${tagHtml(player)}</div>
    <div class="detail-grid">
      <div><span>Our rank</span><strong>#${player.rank}</strong></div>
      <div><span>Market</span><strong>${esc(marketBadge(player))}</strong></div>
      <div><span>Market range</span><strong>${esc(player.draftRange)}</strong></div>
      <div><span>Projection</span><strong>${projectionLabel}</strong></div>
      <div><span>Risk</span><strong>${esc(player.risk)}</strong></div>
      <div><span>Upside</span><strong>${esc(player.upside)}</strong></div>
    </div>
    <div class="back-box ${back.label.toLowerCase().replace("-", "")}">
      <span>Chance available at your next pick (#${back.next})</span>
      <strong>${back.pct}% • ${back.label}</strong>
      <small>${back.confidence} confidence • ${esc(marketSourceLabel(player))}${back.runShift ? ` • positional run adjustment −${back.runShift.toFixed(1)}` : ""}</small>
    </div>
    <p class="detail-analysis">${esc(player.analysis)}</p>
    <div class="source-line"><strong>Baseline:</strong> ESPN PPR ${rankSource(player.espnRank)} • CBS PPR ${rankSource(player.cbsRank)} • FantasyPros half-PPR ${rankSource(player.fpRank)}. Projection averages ${player.projectionSources} published source${player.projectionSources === 1 ? "" : "s"}.</div>
    <div class="value-panel">
      <div class="value-total"><span>Live Value</span><strong>${details.value}</strong></div>
      <div class="value-breakdown"><span>Board ${Math.round(details.base)}</span><span>Fall ${signed(details.fall)}</span><span>Roster ${signed(details.roster)}</span><span>Scarcity ${signed(details.scarcity)}</span><span>Projection ${signed(details.projection)}</span><span>Timing ${signed(details.timing)}</span><span>Tags ${signed(details.tags)}</span></div>
    </div>`;
  $("#draftMineBtn").textContent = player.status === "mine" ? "✓ On my roster" : "✓ I drafted this player";
  $("#draftOtherBtn").textContent = player.status === "other" ? "× Marked taken" : "× Someone else drafted this player";
  $("#undraftBtn").hidden = player.status === "available";
  $("#actionSheet").classList.remove("hidden");
}

function closeSheet() {
  $("#actionSheet").classList.add("hidden");
  selectedId = null;
}

function setStatus(status) {
  if (!VALID_STATUSES.has(status) || !selectedId) return;
  const player = state.players.find(item => item.id === selectedId);
  if (!player || player.status === status) {
    closeSheet();
    return;
  }
  snapshot();
  const oldStatus = player.status;
  const oldPick = player.draftedAt;
  player.status = status;
  if (oldStatus === "available" && status !== "available") {
    player.draftedAt = currentPickNumber();
    state.draft.currentPick = currentPickNumber() + 1;
  } else if (oldStatus !== "available" && status === "available") {
    player.draftedAt = null;
    if (Number(oldPick) === currentPickNumber() - 1) state.draft.currentPick = Math.max(1, currentPickNumber() - 1);
  }
  saveState();
  closeSheet();
  syncDraftInputs();
  renderAll();
}

function renderAll() {
  renderDraftDashboard();
  renderBoard();
  renderFavorites();
  renderBest();
  renderRoster();
  renderDraftLog();
  bindCards();
  updateUndoButton();
}

function rebuildDraftSlotOptions() {
  const select = $("#draftSlot");
  const size = clamp(Math.round(Number($("#leagueSize").value) || state.draft.leagueSize), 2, 32);
  const selected = clamp(Math.round(Number(state.draft.draftSlot) || 1), 1, size);
  select.innerHTML = Array.from({ length: size }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("");
  select.value = String(selected);
}

function syncDraftInputs() {
  $("#leagueSize").value = state.draft.leagueSize;
  rebuildDraftSlotOptions();
  $("#draftSlot").value = String(state.draft.draftSlot);
  $("#manualCurrentPick").value = state.draft.currentPick;
}

function syncNeedsInputs() {
  Object.keys(DEFAULT_NEEDS).forEach(key => {
    const input = $(`#need${key}`);
    if (input) input.value = state.needs[key];
  });
}

function syncInputs() {
  syncDraftInputs();
  syncNeedsInputs();
}

function saveDraftSetup() {
  snapshot();
  const leagueSize = clamp(Math.round(Number($("#leagueSize").value) || 12), 2, 32);
  state.draft.leagueSize = leagueSize;
  state.draft.draftSlot = clamp(Math.round(Number($("#draftSlot").value) || 1), 1, leagueSize);
  saveState();
  syncDraftInputs();
  renderAll();
}

function setManualCurrentPick() {
  snapshot();
  state.draft.currentPick = clamp(Math.round(Number($("#manualCurrentPick").value) || 1), 1, 9999);
  saveState();
  syncDraftInputs();
  renderAll();
}

function saveNeeds() {
  snapshot();
  const incoming = {};
  Object.keys(DEFAULT_NEEDS).forEach(key => {
    incoming[key] = Number($(`#need${key}`).value);
  });
  state.needs = cleanNeeds(incoming);
  state.draft.rounds = roundsFromNeeds(state.needs);
  saveState();
  syncNeedsInputs();
  renderAll();
  alert("Lineup and roster settings saved.");
}

function exportBackup() {
  const payload = { ...state, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fantasy-draft-board-v6-backup.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!Array.isArray(incoming.players)) throw new Error("Missing players");
      snapshot();
      state = makeState(incoming);
      saveState();
      syncInputs();
      renderAll();
      alert("Backup restored onto the current v6 player data.");
    } catch (_) {
      alert("That backup file is not valid.");
    }
  };
  reader.readAsText(file);
}

$$('.tab').forEach(button => {
  button.onclick = () => {
    currentTab = button.dataset.tab;
    $$(".tab").forEach(item => item.classList.toggle("active", item === button));
    $$(".view").forEach(view => view.classList.remove("active"));
    $(`#${currentTab}View`).classList.add("active");
  };
});

$("#searchInput").addEventListener("input", renderAll);
$("#positionFilter").addEventListener("change", renderAll);
$$('.tag-filter').forEach(button => {
  button.onclick = () => {
    tagFilter = button.dataset.tag;
    $$(".tag-filter").forEach(item => item.classList.toggle("active", item === button));
    renderAll();
  };
});
$("#undoBtn").onclick = undo;
$("#draftMineBtn").onclick = () => setStatus("mine");
$("#draftOtherBtn").onclick = () => setStatus("other");
$("#undraftBtn").onclick = () => setStatus("available");
$("#cancelSheetBtn").onclick = closeSheet;
$("#actionSheet").onclick = event => { if (event.target === $("#actionSheet")) closeSheet(); };
$("#exportBtn").onclick = exportBackup;
$("#backupInput").onchange = event => { if (event.target.files[0]) importBackup(event.target.files[0]); };
$("#leagueSize").addEventListener("change", rebuildDraftSlotOptions);
$("#saveDraftSetupBtn").onclick = saveDraftSetup;
$("#setCurrentPickBtn").onclick = setManualCurrentPick;
$("#saveNeedsBtn").onclick = saveNeeds;
$("#resetDraftBtn").onclick = () => {
  if (!confirm("Clear every drafted and favorite status?")) return;
  snapshot();
  state.players.forEach(player => {
    player.status = "available";
    player.favorite = false;
    player.draftedAt = null;
  });
  state.draft.currentPick = 1;
  saveState();
  syncInputs();
  renderAll();
};

syncInputs();
renderAll();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=6.0.0").catch(() => {}));
}
