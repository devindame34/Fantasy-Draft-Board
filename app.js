const STORAGE_KEY = "fantasyDraftBoard_v3";

const starterPlayers = [
  ["Jahmyr Gibbs","RB","DET",1,false],
  ["Bijan Robinson","RB","ATL",1,false],
  ["Christian McCaffrey","RB","SF",1,false],
  ["Puka Nacua","WR","LAR",1,false],
  ["Ja'Marr Chase","WR","CIN",1,false],
  ["Justin Jefferson","WR","MIN",1,false],
  ["CeeDee Lamb","WR","DAL",1,false],
  ["Amon-Ra St. Brown","WR","DET",1,false],
  ["Malik Nabers","WR","NYG",2,false],
  ["Saquon Barkley","RB","PHI",2,false],
  ["De'Von Achane","RB","MIA",2,false],
  ["Nico Collins","WR","HOU",2,false],
  ["Brock Bowers","TE","LV",2,false],
  ["Drake London","WR","ATL",2,false],
  ["Josh Allen","QB","BUF",2,false],
  ["Lamar Jackson","QB","BAL",2,false],
  ["Jonathan Taylor","RB","IND",2,false],
  ["Brian Thomas Jr.","WR","JAX",2,false],
  ["Trey McBride","TE","ARI",2,false],
  ["A.J. Brown","WR","PHI",2,false],
  ["James Cook","RB","BUF",3,false],
  ["Bucky Irving","RB","TB",3,false],
  ["Jaxon Smith-Njigba","WR","SEA",3,false],
  ["Tee Higgins","WR","CIN",3,false],
  ["George Kittle","TE","SF",3,false],
  ["Joe Burrow","QB","CIN",3,false],
  ["Jalen Hurts","QB","PHI",3,false],
  ["Rome Odunze","WR","CHI",3,false],
  ["Ladd McConkey","WR","LAC",3,false],
  ["Garrett Wilson","WR","NYJ",3,false],
  ["Kyren Williams","RB","LAR",3,false],
  ["Chase Brown","RB","CIN",3,false],
  ["Josh Jacobs","RB","GB",3,false],
  ["Davante Adams","WR","LAR",4,false],
  ["Mike Evans","WR","SF",4,false],
  ["Terry McLaurin","WR","WAS",4,false],
  ["DJ Moore","WR","CHI",4,false],
  ["Marvin Harrison Jr.","WR","ARI",4,false],
  ["Rashee Rice","WR","KC",4,false],
  ["Jayden Daniels","QB","WAS",4,false],
  ["Patrick Mahomes","QB","KC",4,false],
  ["Sam LaPorta","TE","DET",4,false],
  ["Kenneth Walker III","RB","SEA",4,false],
  ["TreVeyon Henderson","RB","NE",4,false],
  ["James Conner","RB","ARI",4,false],
  ["D'Andre Swift","RB","CHI",5,false],
  ["Chris Olave","WR","NO",5,false],
  ["Zay Flowers","WR","BAL",5,false],
  ["Xavier Worthy","WR","KC",5,false],
  ["Calvin Ridley","WR","TEN",5,false],
  ["David Montgomery","RB","DET",5,false],
  ["Tony Pollard","RB","TEN",5,false],
  ["Isiah Pacheco","RB","DET",5,true],
  ["Jonah Coleman","RB","DEN",6,true],
  ["Kyler Murray","QB","MIN",6,true],
  ["Tyler Shough","QB","NO",7,true],
  ["Ricky Pearsall","WR","SF",7,true],
  ["Keon Coleman","WR","BUF",7,true],
  ["Jayden Reed","WR","GB",7,true],
  ["Romeo Doubs","WR","GB",8,true]
].map((p,i)=>({id:`starter-${i+1}`,name:p[0],pos:p[1],team:p[2],tier:p[3],sleeper:p[4],favorite:false,status:"available"}));

const defaultState = {
  players: starterPlayers,
  needs:{QB:1,RB:2,WR:2,TE:1,FLEX:1},
  history:[]
};

let state = loadState();
let selectedId = null;
let currentTab = "board";

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved && Array.isArray(saved.players)) return saved;
  }catch(e){}
  return clone(defaultState);
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function snapshot(){
  state.history = state.history || [];
  state.history.push(JSON.stringify({players:state.players,needs:state.needs}));
  if(state.history.length>30) state.history.shift();
}
function undo(){
  const prev = state.history?.pop();
  if(!prev) return;
  const restored = JSON.parse(prev);
  state.players = restored.players;
  state.needs = restored.needs;
  saveState(); syncNeedsInputs(); renderAll();
}

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

function playerCard(p, rank){
  const statusClass = p.status==="mine" ? "mine-state" : p.status==="other" ? "other-state" : "";
  const statusText = p.status==="mine" ? " • MY PICK" : p.status==="other" ? " • DRAFTED" : "";
  return `<article class="player ${statusClass}" data-id="${esc(p.id)}">
    <div class="rank">${rank}</div>
    <div class="player-main open-sheet">
      <div class="name">${esc(p.name)}</div>
      <div class="meta">
        <span class="pos">${esc(p.pos)}</span>
        <span>${esc(p.team || "—")}</span>
        <span class="tier">T${esc(p.tier || "—")}</span>
        ${p.sleeper?`<span class="sleeper">SLEEPER</span>`:""}
        ${statusText?`<span>${statusText}</span>`:""}
      </div>
    </div>
    <div class="actions">
      <button class="icon-btn favorite-btn ${p.favorite?"starred":""}" aria-label="Favorite">${p.favorite?"★":"☆"}</button>
      <button class="icon-btn open-sheet" aria-label="Draft status">⋯</button>
    </div>
  </article>`;
}

function matchesFilters(p){
  const q = $("#searchInput").value.trim().toLowerCase();
  const pos = $("#positionFilter").value;
  return (!q || `${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(q)) && (pos==="ALL" || p.pos===pos);
}
function availableFiltered(){ return state.players.filter(p=>p.status==="available" && matchesFilters(p)); }

function renderBoard(){
  const arr = availableFiltered();
  $("#boardList").innerHTML = arr.length ? arr.map(p=>playerCard(p,state.players.indexOf(p)+1)).join("") : `<div class="empty">No available players match.</div>`;
}
function renderFavorites(){
  const arr = state.players.filter(p=>p.favorite && p.status==="available" && matchesFilters(p));
  $("#favoriteCount").textContent = `${arr.length} available`;
  $("#favoritesList").innerHTML = arr.length ? arr.map(p=>playerCard(p,state.players.indexOf(p)+1)).join("") : `<div class="empty">Star players on the board and they’ll appear here.</div>`;
}
function mineByPos(){
  const counts={QB:0,RB:0,WR:0,TE:0,K:0,DST:0};
  state.players.filter(p=>p.status==="mine").forEach(p=>counts[p.pos]=(counts[p.pos]||0)+1);
  return counts;
}
function remainingNeeds(){
  const mine=mineByPos(), n=state.needs;
  const base={
    QB:Math.max(0,n.QB-(mine.QB||0)),
    RB:Math.max(0,n.RB-(mine.RB||0)),
    WR:Math.max(0,n.WR-(mine.WR||0)),
    TE:Math.max(0,n.TE-(mine.TE||0))
  };
  const rbExtra=Math.max(0,(mine.RB||0)-n.RB), wrExtra=Math.max(0,(mine.WR||0)-n.WR), teExtra=Math.max(0,(mine.TE||0)-n.TE);
  base.FLEX=Math.max(0,n.FLEX-(rbExtra+wrExtra+teExtra));
  return base;
}
function recommendationScore(p, idx){
  const r=remainingNeeds();
  let boost=0;
  if(r[p.pos]>0) boost += 38;
  if(r.FLEX>0 && ["RB","WR","TE"].includes(p.pos)) boost += 15;
  if(p.favorite) boost += 8;
  if(p.sleeper) boost += 2;
  const mine=mineByPos();
  if(p.pos==="QB" && mine.QB>=state.needs.QB) boost -= 24;
  if(p.pos==="TE" && mine.TE>=state.needs.TE && r.FLEX===0) boost -= 18;
  return (1000-idx*4)+boost;
}
function renderBest(){
  const r=remainingNeeds();
  $("#needsSummary").innerHTML = ["QB","RB","WR","TE","FLEX"].map(k=>`<span class="need ${r[k]>0?"hot":""}">${k}: ${r[k]} needed</span>`).join("");
  const arr = state.players.map((p,i)=>({p,i})).filter(x=>x.p.status==="available" && matchesFilters(x.p))
    .sort((a,b)=>recommendationScore(b.p,b.i)-recommendationScore(a.p,a.i)).slice(0,30);
  $("#bestList").innerHTML = arr.length ? arr.map(x=>playerCard(x.p,x.i+1)).join("") : `<div class="empty">No available players match.</div>`;
}
function renderRoster(){
  const arr=state.players.filter(p=>p.status==="mine");
  $("#myPickCount").textContent=`${arr.length} picks`;
  $("#rosterList").innerHTML=arr.length?arr.map(p=>playerCard(p,state.players.indexOf(p)+1)).join(""):`<div class="empty">Your picks will show here.</div>`;
}
function renderAll(){ renderBoard(); renderFavorites(); renderBest(); renderRoster(); bindCards(); }

function bindCards(){
  document.querySelectorAll(".favorite-btn").forEach(btn=>btn.onclick=e=>{
    e.stopPropagation();
    const id=btn.closest(".player").dataset.id;
    snapshot();
    const p=state.players.find(x=>x.id===id); p.favorite=!p.favorite;
    saveState(); renderAll();
  });
  document.querySelectorAll(".open-sheet").forEach(el=>el.onclick=e=>{
    const card=e.target.closest(".player"); if(!card)return;
    selectedId=card.dataset.id; openSheet();
  });
}

function openSheet(){
  const p=state.players.find(x=>x.id===selectedId); if(!p)return;
  $("#sheetPlayer").textContent=`${p.name} — ${p.pos} ${p.team}`;
  $("#actionSheet").classList.remove("hidden");
}
function closeSheet(){ $("#actionSheet").classList.add("hidden"); selectedId=null; }
function setStatus(status){
  if(!selectedId)return;
  snapshot();
  const p=state.players.find(x=>x.id===selectedId); p.status=status;
  saveState(); closeSheet(); renderAll();
}

function parseRankings(text){
  return text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map((line,i)=>{
    const parts=line.split("|").map(x=>x.trim());
    const name=parts[0]||"";
    const pos=(parts[1]||"").toUpperCase();
    if(!name || !["QB","RB","WR","TE","K","DST"].includes(pos)) return null;
    const sleeper=(parts[4]||"").toLowerCase();
    return {
      id:`custom-${Date.now()}-${i}-${Math.random().toString(36).slice(2,6)}`,
      name,pos,team:(parts[2]||"").toUpperCase(),tier:Number(parts[3])||Math.ceil((i+1)/12),
      sleeper:["sleeper","yes","true","1","⭐"].includes(sleeper),
      favorite:false,status:"available"
    };
  }).filter(Boolean);
}
function importRankings(mode){
  const players=parseRankings($("#importBox").value);
  if(!players.length){ alert("I couldn't find any valid lines. Use: Name | POS | Team | Tier | sleeper"); return; }
  snapshot();
  if(mode==="replace") state.players=players; else state.players=[...state.players,...players];
  saveState(); $("#importBox").value=""; renderAll();
  alert(`${players.length} players imported.`);
}

function exportBackup(){
  const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="fantasy-draft-board-backup.json"; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),5000);
}
function importBackup(file){
  const r=new FileReader();
  r.onload=()=>{ try{
    const data=JSON.parse(r.result);
    if(!Array.isArray(data.players)) throw new Error();
    snapshot(); state.players=data.players; state.needs=data.needs||state.needs; saveState(); syncNeedsInputs(); renderAll(); alert("Backup restored.");
  }catch(e){alert("That backup file wasn't valid.");}};
  r.readAsText(file);
}
function syncNeedsInputs(){
  ["QB","RB","WR","TE","FLEX"].forEach(k=>$("#need"+k).value=state.needs[k]??0);
}
function saveNeeds(){
  snapshot();
  ["QB","RB","WR","TE","FLEX"].forEach(k=>state.needs[k]=Math.max(0,Number($("#need"+k).value)||0));
  saveState(); renderAll(); alert("Lineup needs saved.");
}

document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{
  currentTab=btn.dataset.tab;
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===btn));
  document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
  $("#"+currentTab+"View").classList.add("active");
});
$("#searchInput").addEventListener("input",renderAll);
$("#positionFilter").addEventListener("change",renderAll);
$("#undoBtn").onclick=undo;
$("#draftMineBtn").onclick=()=>setStatus("mine");
$("#draftOtherBtn").onclick=()=>setStatus("other");
$("#undraftBtn").onclick=()=>setStatus("available");
$("#cancelSheetBtn").onclick=closeSheet;
$("#actionSheet").onclick=e=>{if(e.target===$("#actionSheet"))closeSheet()};
$("#replaceRankingsBtn").onclick=()=>importRankings("replace");
$("#appendRankingsBtn").onclick=()=>importRankings("append");
$("#exportBtn").onclick=exportBackup;
$("#backupInput").onchange=e=>{if(e.target.files[0])importBackup(e.target.files[0])};
$("#saveNeedsBtn").onclick=saveNeeds;
$("#resetDraftBtn").onclick=()=>{
  if(!confirm("Clear all draft and favorite status?"))return;
  snapshot(); state.players.forEach(p=>{p.status="available";p.favorite=false}); saveState(); renderAll();
};

syncNeedsInputs();
renderAll();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
