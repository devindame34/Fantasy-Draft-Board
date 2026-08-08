const STORAGE_KEY = "fantasyDraftBoard_v3";

const starterPlayers = [
  ["Jahmyr Gibbs","RB","DET",1,false],
  ["Puka Nacua","WR","LAR",1,false],
  ["Bijan Robinson","RB","ATL",1,false],
  ["Christian McCaffrey","RB","SF",1,false],
  ["Ja'Marr Chase","WR","CIN",1,false],
  ["CeeDee Lamb","WR","DAL",2,false],
  ["Jaxon Smith-Njigba","WR","SEA",2,false],
  ["Jonathan Taylor","RB","IND",2,false],
  ["Amon-Ra St. Brown","WR","DET",2,false],
  ["Justin Jefferson","WR","MIN",2,false],
  ["James Cook III","RB","BUF",2,false],
  ["Drake London","WR","ATL",2,false],
  ["Saquon Barkley","RB","PHI",2,false],
  ["Ashton Jeanty","RB","",2,false],
  ["Kenneth Walker III","RB","SEA",2,false],
  ["George Pickens","WR","",2,false],
  ["De'Von Achane","RB","MIA",3,false],
  ["Chase Brown","RB","CIN",3,false],
  ["Omarion Hampton","RB","",3,false],
  ["Derrick Henry","RB","",3,false],
  ["Nico Collins","WR","HOU",3,false],
  ["Brock Bowers","TE","LV",3,false],
  ["Chris Olave","WR","NO",3,false],
  ["A.J. Brown","WR","PHI",3,false],
  ["Jeremiyah Love","RB","",4,false],
  ["DeVonta Smith","WR","",4,false],
  ["Trey McBride","TE","ARI",4,false],
  ["Kyren Williams","RB","LAR",4,false],
  ["Josh Allen","QB","BUF",4,false],
  ["Tee Higgins","WR","CIN",4,false],
  ["Javonte Williams","RB","",4,false],
  ["Travis Etienne Jr.","RB","",4,false],
  ["Zay Flowers","WR","BAL",4,false],
  ["Breece Hall","RB","",4,false],
  ["Davante Adams","WR","LAR",4,false],
  ["Rashee Rice","WR","KC",4,false],
  ["Josh Jacobs","RB","GB",5,false],
  ["Colston Loveland","TE","",5,false],
  ["Ladd McConkey","WR","LAC",5,false],
  ["Terry McLaurin","WR","WAS",5,false],
  ["Garrett Wilson","WR","NYJ",5,false],
  ["Emeka Egbuka","WR","",5,false],
  ["Luther Burden III","WR","",5,false],
  ["Tetairoa McMillan","WR","",5,false],
  ["Jaylen Waddle","WR","",5,false],
  ["Malik Nabers","WR","NYG",5,false],
  ["Cam Skattebo","RB","",5,false],
  ["Lamar Jackson","QB","BAL",5,false],
  ["Jameson Williams","WR","",5,false],
  ["Mike Evans","WR","SF",5,false],
  ["D'Andre Swift","RB","CHI",5,false],
  ["DJ Moore","WR","CHI",5,false],
  ["Jayden Daniels","QB","WAS",5,false],
  ["Bhayshul Tuten","RB","",6,false],
  ["David Montgomery","RB","DET",6,false],
  ["TreVeyon Henderson","RB","NE",6,false],
  ["Quinshon Judkins","RB","",6,false],
  ["Drake Maye","QB","",6,false],
  ["Bucky Irving","RB","TB",6,false],
  ["Jadarian Price","RB","",6,true],
  ["Jordyn Tyson","WR","",6,true],
  ["Christian Watson","WR","",6,false],
  ["Joe Burrow","QB","CIN",6,false],
  ["Carnell Tate","WR","",7,true],
  ["Marvin Harrison Jr.","WR","ARI",7,false],
  ["Tony Pollard","RB","TEN",7,false],
  ["Parker Washington","WR","",7,true],
  ["Rhamondre Stevenson","RB","",7,false],
  ["Tyler Warren","TE","",7,false],
  ["Chuba Hubbard","RB","",7,false],
  ["Jalen Hurts","QB","PHI",7,false],
  ["Rome Odunze","WR","CHI",7,false],
  ["Brian Thomas Jr.","WR","JAX",7,false],
  ["Caleb Williams","QB","",7,false],
  ["DK Metcalf","WR","",7,false],
  ["Tucker Kraft","TE","",7,false],
  ["Rico Dowdle","RB","",7,false],
  ["Jaylen Warren","RB","",7,false],
  ["Courtland Sutton","WR","",7,false],
  ["Justin Herbert","QB","",7,false],
  ["Jakobi Meyers","WR","",7,false],
  ["Jordan Addison","WR","",7,false],
  ["Trevor Lawrence","QB","",7,false],
  ["Dak Prescott","QB","",7,false],
  ["J.K. Dobbins","RB","",7,false],
  ["Brock Purdy","QB","",7,false],
  ["Michael Wilson","WR","",8,true],
  ["Jaxson Dart","QB","",8,false],
  ["Kyle Pitts Sr.","TE","",8,false],
  ["Blake Corum","RB","",8,false],
  ["Alec Pierce","WR","",8,false],
  ["Harold Fannin Jr.","TE","",8,false],
  ["Patrick Mahomes II","QB","KC",8,false],
  ["Sam LaPorta","TE","DET",8,false],
  ["Michael Pittman Jr.","WR","",8,false],
  ["Josh Downs","WR","",8,false],
  ["RJ Harvey","RB","",8,false],
  ["Jayden Reed","WR","GB",8,false],
  ["Xavier Worthy","WR","KC",8,false],
  ["Matthew Stafford","QB","",8,false],
  ["Chris Godwin Jr.","WR","",8,false],
  ["Mark Andrews","TE","",8,false],
  ["Bo Nix","QB","",9,false],
  ["Makai Lemon","WR","",9,true],
  ["Kyle Monangai","RB","",9,false],
  ["Kenneth Gainwell","RB","",9,false],
  ["Jordan Love","QB","",9,false],
  ["Ricky Pearsall","WR","SF",9,true],
  ["Dalton Kincaid","TE","",9,false],
  ["George Kittle","TE","SF",9,false],
  ["Kyler Murray","QB","MIN",9,false],
  ["Quentin Johnston","WR","",9,false],
  ["KC Concepcion","WR","",9,true],
  ["Jordan Mason","RB","",9,false],
  ["Matthew Golden","WR","",9,false],
  ["Wan'Dale Robinson","WR","",9,false],
  ["Aaron Jones Sr.","RB","",9,false],
  ["Tyler Shough","QB","NO",9,false],
  ["Jared Goff","QB","",9,false],
  ["Baker Mayfield","QB","",9,false],
  ["Travis Kelce","TE","",9,false],
  ["Malik Willis","QB","",10,false],
  ["Rachaad White","RB","",10,false],
  ["Jake Ferguson","TE","",10,false],
  ["Jalen Coker","WR","",10,true],
  ["Dallas Goedert","TE","",10,false],
  ["Chris Rodriguez Jr.","RB","",10,false],
  ["Jonathon Brooks","RB","",10,false],
  ["Keaton Mitchell","RB","",10,true],
  ["Romeo Doubs","WR","GB",10,false],
  ["Khalil Shakir","WR","",10,false],
  ["Isaiah Likely","TE","",10,false],
  ["Sam Darnold","QB","",10,false],
  ["C.J. Stroud","QB","",10,false],
  ["Tyrone Tracy Jr.","RB","",10,false],
  ["Jayden Higgins","WR","",10,true],
  ["Jalen McMillan","WR","",10,true],
  ["Jacory Croskey-Merritt","RB","",10,false],
  ["Isiah Pacheco","RB","DET",10,false],
  ["Daniel Jones","QB","",10,false],
  ["Oronde Gadsden II","TE","",10,false],
  ["Hunter Henry","TE","",10,false],
  ["Jauan Jennings","WR","",11,false],
  ["Rashid Shaheed","WR","",11,false],
  ["Omar Cooper Jr.","WR","",11,false],
  ["Brenton Strange","TE","",11,false],
  ["Brian Robinson Jr.","RB","",11,false],
  ["Woody Marks","RB","",11,true],
  ["Brandon Aubrey","K","",11,false],
  ["Denzel Boston","WR","",11,true],
  ["Chig Okonkwo","TE","",11,false],
  ["Calvin Ridley","WR","TEN",11,false],
  ["Stefon Diggs","WR","",11,false],
  ["Juwan Johnson","TE","",11,false],
  ["Kenyon Sadiq","TE","",11,false],
  ["Houston Texans","DST","",11,false],
  ["Ryan Flournoy","WR","",11,true],
  ["Jalen Nailor","WR","",11,false],
  ["Cam Ward","QB","",11,false],
  ["Bryce Young","QB","",11,false],
  ["Los Angeles Rams","DST","",11,false],
  ["Tre Tucker","WR","",11,false],
  ["Seattle Seahawks","DST","",11,false],
  ["Ka'imi Fairbairn","K","",11,false],
  ["Denver Broncos","DST","",11,false],
  ["Jerry Jeudy","WR","",11,false],
  ["Deebo Samuel Sr.","WR","",11,false],
  ["T.J. Hockenson","TE","",11,false],
  ["Tyjae Spears","RB","",12,false],
  ["Cam Little","K","",12,false],
  ["Dalton Schultz","TE","",12,false],
  ["Germie Bernard","WR","",12,true],
  ["Pat Freiermuth","TE","",12,false],
  ["Tank Bigsby","RB","",12,false],
  ["Isaac TeSlaa","WR","",12,true],
  ["Fernando Mendoza","QB","",12,false],
  ["Aaron Rodgers","QB","",12,false],
  ["Tyler Allgeier","RB","",12,false],
  ["Jason Myers","K","",12,false],
  ["Dylan Sampson","RB","",12,false],
  ["Cameron Dicker","K","",12,false],
  ["Alvin Kamara","RB","",12,false],
  ["Sean Tucker","RB","",12,false],
  ["Jacoby Brissett","QB","",12,false],
  ["Adonai Mitchell","WR","",12,false],
  ["Kaytron Allen","RB","",12,true],
  ["Terrance Ferguson","TE","",12,false],
  ["Jonah Coleman","RB","DEN",12,true],
  ["Cooper Kupp","WR","",12,false],
  ["Gunnar Helm","TE","",12,false],
  ["Travis Hunter","WR","",12,false],
  ["Antonio Williams","WR","",12,true],
  ["Tre Harris","WR","",12,false],
  ["Greg Dulcich","TE","",12,false],
  ["Jordan James","RB","",12,true],
  ["Emanuel Wilson","RB","",12,false],
  ["Samaje Perine","RB","",12,false],
  ["Braelon Allen","RB","",12,false],
  ["Minnesota Vikings","DST","",12,false],
  ["Ray Davis","RB","",12,false],
  ["Cade Otton","TE","",13,false],
  ["Jacksonville Jaguars","DST","",13,false],
  ["Pittsburgh Steelers","DST","",13,false],
  ["DJ Giddens","RB","",13,true],
  ["Tank Dell","WR","",13,false],
  ["Zach Charbonnet","RB","",13,false],
  ["Pat Bryant","WR","",13,true],
  ["De'Zhaun Stribling","WR","",13,true],
  ["Kayshon Boutte","WR","",13,false],
  ["Jaydon Blue","RB","",13,false],
  ["Jaylin Noel","WR","",13,true],
  ["MarShawn Lloyd","RB","",13,true],
  ["Mike Washington Jr.","RB","",13,true],
  ["Los Angeles Chargers","DST","",13,false],
  ["Zachariah Branch","WR","",13,true],
  ["Baltimore Ravens","DST","",13,false],
  ["Keenan Allen","WR","",13,false],
  ["Troy Franklin","WR","",13,true],
  ["Justice Hill","RB","",13,false],
  ["Devaughn Vele","WR","",13,false],
  ["Dontayvion Wicks","WR","",13,true],
  ["Malik Washington","WR","",13,true],
  ["Christian Kirk","WR","",13,false],
  ["Mike Gesicki","TE","",13,false],
  ["AJ Barner","TE","",13,false],
  ["Tua Tagovailoa","QB","",13,false],
  ["Rashod Bateman","WR","",13,false],
  ["Malachi Fields","WR","",14,true],
  ["Emmett Johnson","RB","",14,true],
  ["Jalen Tolbert","WR","",14,false],
  ["Kendrick Bourne","WR","",14,false],
  ["Nicholas Singleton","RB","",14,true],
  ["Andrei Iosivas","WR","",14,false],
  ["Mack Hollins","WR","",14,false],
  ["Najee Harris","RB","",14,false],
  ["Colby Parkinson","TE","",14,false],
  ["Darnell Mooney","WR","",14,false],
  ["Geno Smith","QB","",14,false],
  ["David Njoku","TE","",14,false],
  ["Chimere Dike","WR","",14,true],
  ["Jack Bech","WR","",14,true],
  ["Marvin Mims Jr.","WR","",14,true],
  ["Ted Hurst","WR","",14,true],
  ["Demond Claiborne","RB","",14,true],
  ["Tyreek Hill","WR","",14,false],
  ["Chris Brazzell II","WR","",14,true],
  ["Chris Bell","WR","",14,true],
  ["Kalif Raymond","WR","",14,false],
  ["Darnell Washington","TE","",14,false],
  ["Kaelon Black","RB","",14,true]
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
    if(saved && Array.isArray(saved.players)){
      // Migrate an older/smaller board to the current master ranking list.
      // Matching players keep their favorite and draft status.
      if(saved.players.length !== starterPlayers.length){
        const byName = new Map(saved.players.map(p => [p.name, p]));
        saved.players = starterPlayers.map(p => {
          const old = byName.get(p.name);
          return old ? {...p, favorite:!!old.favorite, status:old.status || "available"} : p;
        });
      }
      saved.needs = saved.needs || clone(defaultState.needs);
      saved.history = saved.history || [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      return saved;
    }
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
