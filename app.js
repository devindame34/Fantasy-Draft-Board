const STORAGE_KEY = "fantasyDraftBoard_v3";

const starterPlayers = [
  ["Jahmyr Gibbs","RB","DET",1,false,false,false],
  ["Puka Nacua","WR","LAR",1,false,true,false],
  ["Bijan Robinson","RB","ATL",1,false,false,false],
  ["Christian McCaffrey","RB","SF",1,false,false,true],
  ["Ja'Marr Chase","WR","CIN",1,false,false,false],
  ["CeeDee Lamb","WR","DAL",1,false,true,false],
  ["Jaxon Smith-Njigba","WR","SEA",1,false,true,false],
  ["Jonathan Taylor","RB","IND",1,false,false,false],
  ["Amon-Ra St. Brown","WR","DET",1,false,false,false],
  ["Justin Jefferson","WR","MIN",1,false,false,false],
  ["James Cook III","RB","BUF",1,false,false,false],
  ["Drake London","WR","ATL",1,false,true,false],
  ["Saquon Barkley","RB","PHI",1,false,false,false],
  ["Ashton Jeanty","RB","",1,false,false,false],
  ["Kenneth Walker III","RB","SEA",1,false,true,false],
  ["George Pickens","WR","",1,false,false,false],
  ["De'Von Achane","RB","MIA",1,false,false,true],
  ["Chase Brown","RB","CIN",1,false,true,false],
  ["Omarion Hampton","RB","",2,false,false,false],
  ["Derrick Henry","RB","",2,false,false,false],
  ["Nico Collins","WR","HOU",2,false,true,false],
  ["Brock Bowers","TE","LV",2,false,true,false],
  ["Chris Olave","WR","NO",2,false,true,false],
  ["A.J. Brown","WR","PHI",2,false,false,false],
  ["Jeremiyah Love","RB","",2,false,false,true],
  ["DeVonta Smith","WR","",2,false,false,false],
  ["Trey McBride","TE","ARI",2,false,false,false],
  ["Kyren Williams","RB","LAR",2,false,false,false],
  ["Josh Allen","QB","BUF",2,false,false,true],
  ["Tee Higgins","WR","CIN",2,false,false,false],
  ["Javonte Williams","RB","",2,false,false,false],
  ["Travis Etienne Jr.","RB","",2,false,false,false],
  ["Zay Flowers","WR","BAL",2,false,true,false],
  ["Breece Hall","RB","",2,false,false,false],
  ["Davante Adams","WR","LAR",2,false,false,false],
  ["Rashee Rice","WR","KC",2,false,false,false],
  ["Josh Jacobs","RB","GB",3,false,false,false],
  ["Colston Loveland","TE","",3,false,false,false],
  ["Ladd McConkey","WR","LAC",3,false,true,false],
  ["Terry McLaurin","WR","WAS",3,false,false,false],
  ["Garrett Wilson","WR","NYJ",3,false,false,false],
  ["Emeka Egbuka","WR","",3,false,true,false],
  ["Luther Burden III","WR","",3,false,false,false],
  ["Tetairoa McMillan","WR","",3,false,false,false],
  ["Jaylen Waddle","WR","",3,false,false,false],
  ["Malik Nabers","WR","NYG",3,false,false,false],
  ["Cam Skattebo","RB","",3,false,false,true],
  ["Lamar Jackson","QB","BAL",3,false,false,false],
  ["Jameson Williams","WR","",3,false,false,false],
  ["Mike Evans","WR","SF",3,false,false,false],
  ["D'Andre Swift","RB","CHI",3,false,false,false],
  ["DJ Moore","WR","CHI",3,false,false,false],
  ["Jayden Daniels","QB","WAS",3,false,false,false],
  ["Bhayshul Tuten","RB","",3,false,false,false],
  ["David Montgomery","RB","DET",4,false,false,false],
  ["TreVeyon Henderson","RB","NE",4,false,false,false],
  ["Quinshon Judkins","RB","",4,false,true,false],
  ["Drake Maye","QB","",4,false,true,false],
  ["Bucky Irving","RB","TB",4,false,false,false],
  ["Jadarian Price","RB","",4,false,false,true],
  ["Jordyn Tyson","WR","",4,true,true,false],
  ["Christian Watson","WR","",4,false,true,false],
  ["Joe Burrow","QB","CIN",4,false,false,false],
  ["Carnell Tate","WR","",4,false,false,false],
  ["Marvin Harrison Jr.","WR","ARI",4,false,false,false],
  ["Tony Pollard","RB","TEN",4,false,false,true],
  ["Parker Washington","WR","",4,false,true,false],
  ["Rhamondre Stevenson","RB","",4,false,false,false],
  ["Tyler Warren","TE","",4,false,true,false],
  ["Chuba Hubbard","RB","",4,false,false,true],
  ["Jalen Hurts","QB","PHI",4,false,false,false],
  ["Rome Odunze","WR","CHI",4,false,false,false],
  ["Brian Thomas Jr.","WR","JAX",5,false,false,false],
  ["Caleb Williams","QB","",5,false,false,false],
  ["DK Metcalf","WR","",5,false,false,false],
  ["Tucker Kraft","TE","",5,false,true,false],
  ["Rico Dowdle","RB","",5,false,false,false],
  ["Jaylen Warren","RB","",5,false,false,false],
  ["Courtland Sutton","WR","",5,false,false,false],
  ["Justin Herbert","QB","",5,false,true,false],
  ["Jakobi Meyers","WR","",5,false,true,false],
  ["Jordan Addison","WR","",5,false,false,false],
  ["Trevor Lawrence","QB","",5,false,false,false],
  ["Dak Prescott","QB","",5,false,false,false],
  ["J.K. Dobbins","RB","",5,false,false,false],
  ["Brock Purdy","QB","",5,false,false,false],
  ["Michael Wilson","WR","",5,false,true,false],
  ["Jaxson Dart","QB","",5,false,false,false],
  ["Kyle Pitts Sr.","TE","",5,false,false,false],
  ["Blake Corum","RB","",5,false,false,false],
  ["Alec Pierce","WR","",6,false,true,false],
  ["Harold Fannin Jr.","TE","",6,false,true,false],
  ["Patrick Mahomes II","QB","KC",6,false,false,false],
  ["Sam LaPorta","TE","DET",6,false,false,false],
  ["Michael Pittman Jr.","WR","",6,false,false,false],
  ["Josh Downs","WR","",6,false,false,false],
  ["RJ Harvey","RB","",6,false,false,true],
  ["Jayden Reed","WR","GB",6,false,false,false],
  ["Xavier Worthy","WR","KC",6,false,false,false],
  ["Matthew Stafford","QB","",6,false,false,false],
  ["Chris Godwin Jr.","WR","",6,false,false,false],
  ["Mark Andrews","TE","",6,false,false,true],
  ["Bo Nix","QB","",6,false,false,false],
  ["Makai Lemon","WR","",6,false,false,false],
  ["Kyle Monangai","RB","",6,false,false,false],
  ["Kenneth Gainwell","RB","",6,false,false,false],
  ["Jordan Love","QB","",6,false,false,false],
  ["Dalton Kincaid","TE","",6,false,false,false],
  ["George Kittle","TE","SF",7,false,false,true],
  ["Kyler Murray","QB","MIN",7,true,true,false],
  ["Quentin Johnston","WR","",7,false,false,false],
  ["KC Concepcion","WR","",7,false,false,false],
  ["Jordan Mason","RB","",7,false,false,false],
  ["Matthew Golden","WR","",7,false,false,false],
  ["Wan'Dale Robinson","WR","",7,false,false,false],
  ["Aaron Jones Sr.","RB","",7,false,false,false],
  ["Tyler Shough","QB","NO",7,true,false,false],
  ["Jared Goff","QB","",7,false,false,false],
  ["Baker Mayfield","QB","",7,false,false,false],
  ["Travis Kelce","TE","",7,false,false,false],
  ["Malik Willis","QB","",7,true,false,false],
  ["Rachaad White","RB","",7,true,true,false],
  ["Jake Ferguson","TE","",7,false,false,true],
  ["Jalen Coker","WR","",7,true,true,false],
  ["Dallas Goedert","TE","",7,false,false,false],
  ["Chris Rodriguez Jr.","RB","",7,false,false,false],
  ["Jonathon Brooks","RB","",8,true,true,false],
  ["Keaton Mitchell","RB","",8,true,true,false],
  ["Romeo Doubs","WR","GB",8,false,false,false],
  ["Khalil Shakir","WR","",8,false,false,false],
  ["Isaiah Likely","TE","",8,true,false,false],
  ["Sam Darnold","QB","",8,false,false,false],
  ["C.J. Stroud","QB","",8,false,false,false],
  ["Tyrone Tracy Jr.","RB","",8,false,false,false],
  ["Jayden Higgins","WR","",8,true,true,false],
  ["Jalen McMillan","WR","",8,true,true,false],
  ["Jacory Croskey-Merritt","RB","",8,false,false,false],
  ["Isiah Pacheco","RB","DET",8,true,false,false],
  ["Daniel Jones","QB","",8,false,false,false],
  ["Oronde Gadsden II","TE","",8,false,false,true],
  ["Hunter Henry","TE","",8,false,false,false],
  ["Jauan Jennings","WR","",8,false,false,false],
  ["Rashid Shaheed","WR","",8,false,false,false],
  ["Omar Cooper Jr.","WR","",8,false,false,false],
  ["Brenton Strange","TE","",9,false,false,false],
  ["Brian Robinson Jr.","RB","",9,false,false,false],
  ["Woody Marks","RB","",9,true,false,false],
  ["Brandon Aubrey","K","",9,false,false,false],
  ["Denzel Boston","WR","",9,true,false,false],
  ["Chig Okonkwo","TE","",9,false,false,false],
  ["Calvin Ridley","WR","TEN",9,false,false,false],
  ["Stefon Diggs","WR","",9,false,false,false],
  ["Juwan Johnson","TE","",9,false,false,false],
  ["Kenyon Sadiq","TE","",9,false,false,false],
  ["Houston Texans","DST","",9,false,false,false],
  ["Ryan Flournoy","WR","",9,true,false,false],
  ["Jalen Nailor","WR","",9,true,false,false],
  ["Cam Ward","QB","",9,false,false,false],
  ["Bryce Young","QB","",9,false,false,false],
  ["Los Angeles Rams","DST","",9,false,false,false],
  ["Tre Tucker","WR","",9,false,false,false],
  ["Seattle Seahawks","DST","",9,false,false,false],
  ["Ka'imi Fairbairn","K","",10,false,false,false],
  ["Denver Broncos","DST","",10,false,false,false],
  ["Jerry Jeudy","WR","",10,false,false,false],
  ["Deebo Samuel Sr.","WR","",10,false,false,false],
  ["T.J. Hockenson","TE","",10,false,false,false],
  ["Tyjae Spears","RB","",10,true,true,false],
  ["Cam Little","K","",10,false,false,false],
  ["Dalton Schultz","TE","",10,false,false,false],
  ["Germie Bernard","WR","",10,true,false,false],
  ["Pat Freiermuth","TE","",10,false,false,false],
  ["Tank Bigsby","RB","",10,false,false,false],
  ["Isaac TeSlaa","WR","",10,true,false,false],
  ["Fernando Mendoza","QB","",10,false,false,false],
  ["Aaron Rodgers","QB","",10,false,false,false],
  ["Tyler Allgeier","RB","",10,false,false,false],
  ["Jason Myers","K","",10,false,false,false],
  ["Dylan Sampson","RB","",10,false,false,false],
  ["Cameron Dicker","K","",10,false,false,false],
  ["Alvin Kamara","RB","",11,false,false,false],
  ["Sean Tucker","RB","",11,false,false,false],
  ["Jacoby Brissett","QB","",11,false,false,false],
  ["Adonai Mitchell","WR","",11,false,false,false],
  ["Kaytron Allen","RB","",11,false,false,false],
  ["Terrance Ferguson","TE","",11,false,false,false],
  ["Jonah Coleman","RB","DEN",11,true,true,false],
  ["Cooper Kupp","WR","",11,false,false,false],
  ["Gunnar Helm","TE","",11,false,false,false],
  ["Travis Hunter","WR","",11,false,false,false],
  ["Antonio Williams","WR","",11,true,true,false],
  ["Tre Harris","WR","",11,true,false,false],
  ["Greg Dulcich","TE","",11,false,false,false],
  ["Jordan James","RB","",11,true,false,false],
  ["Emanuel Wilson","RB","",11,false,false,false],
  ["Samaje Perine","RB","",11,false,false,false],
  ["Braelon Allen","RB","",11,false,false,false],
  ["Minnesota Vikings","DST","",11,false,false,false],
  ["Ray Davis","RB","",12,false,false,false],
  ["Cade Otton","TE","",12,false,false,false],
  ["Jacksonville Jaguars","DST","",12,false,false,false],
  ["Pittsburgh Steelers","DST","",12,false,false,false],
  ["DJ Giddens","RB","",12,true,true,false],
  ["Tank Dell","WR","",12,false,false,false],
  ["Zach Charbonnet","RB","",12,false,false,false],
  ["Pat Bryant","WR","",12,true,false,false],
  ["De'Zhaun Stribling","WR","",12,true,false,false],
  ["Kayshon Boutte","WR","",12,false,false,false],
  ["Jaydon Blue","RB","",12,true,false,false],
  ["Jaylin Noel","WR","",12,true,true,false],
  ["MarShawn Lloyd","RB","",12,true,false,false],
  ["Mike Washington Jr.","RB","",12,false,false,false],
  ["Los Angeles Chargers","DST","",12,false,false,false],
  ["Zachariah Branch","WR","",12,true,false,false],
  ["Baltimore Ravens","DST","",12,false,false,false],
  ["Keenan Allen","WR","",12,false,false,false],
  ["Troy Franklin","WR","",13,false,false,false],
  ["Justice Hill","RB","",13,false,false,false],
  ["Devaughn Vele","WR","",13,false,false,false],
  ["Dontayvion Wicks","WR","",13,true,true,false],
  ["Malik Washington","WR","",13,false,false,false],
  ["Christian Kirk","WR","",13,false,false,false],
  ["Mike Gesicki","TE","",13,false,false,false],
  ["AJ Barner","TE","",13,true,false,false],
  ["Tua Tagovailoa","QB","",13,false,false,false],
  ["Rashod Bateman","WR","",13,false,false,false],
  ["Malachi Fields","WR","",13,true,false,false],
  ["Emmett Johnson","RB","",13,true,false,false],
  ["Jalen Tolbert","WR","",13,false,false,false],
  ["Kendrick Bourne","WR","",13,false,false,false],
  ["Nicholas Singleton","RB","",13,true,false,false],
  ["Andrei Iosivas","WR","",13,false,false,false],
  ["Mack Hollins","WR","",13,false,false,false],
  ["Najee Harris","RB","",13,false,false,false],
  ["Colby Parkinson","TE","",14,false,false,false],
  ["Darnell Mooney","WR","",14,false,false,false],
  ["Geno Smith","QB","",14,false,false,false],
  ["David Njoku","TE","",14,false,false,false],
  ["Chimere Dike","WR","",14,false,false,false],
  ["Jack Bech","WR","",14,false,false,false],
  ["Marvin Mims Jr.","WR","",14,true,true,false],
  ["Ted Hurst","WR","",14,false,false,false],
  ["Demond Claiborne","RB","",14,false,false,false],
  ["Tyreek Hill","WR","",14,false,false,false],
  ["Darius Slayton","WR","",14,false,false,false],
  ["Chris Brooks","RB","",14,false,false,false],
  ["Michael Mayer","TE","",14,false,false,false],
  ["Ollie Gordon II","RB","",14,true,false,false],
  ["Kaelon Black","RB","",14,true,false,false],
  ["Buffalo Bills","DST","",14,false,false,false]
].map((p,i)=>({id:`starter-${i+1}`,name:p[0],pos:p[1],team:p[2],tier:p[3],sleeper:p[4],myGuy:p[5],risky:p[6],favorite:false,status:"available"}));
const CURATED_SLEEPERS = new Set(["Jordyn Tyson", "Kyler Murray", "Tyler Shough", "Malik Willis", "Rachaad White", "Jalen Coker", "Jonathon Brooks", "Keaton Mitchell", "Isaiah Likely", "Jayden Higgins", "Jalen McMillan", "Isiah Pacheco", "Woody Marks", "Denzel Boston", "Ryan Flournoy", "Jalen Nailor", "Tyjae Spears", "Germie Bernard", "Isaac TeSlaa", "Jonah Coleman", "Antonio Williams", "Tre Harris", "Jordan James", "DJ Giddens", "Pat Bryant", "De'Zhaun Stribling", "Jaydon Blue", "Jaylin Noel", "MarShawn Lloyd", "Zachariah Branch", "Dontayvion Wicks", "AJ Barner", "Malachi Fields", "Emmett Johnson", "Nicholas Singleton", "Marvin Mims Jr.", "Ollie Gordon II", "Kaelon Black"]);
const CURATED_MY_GUYS = new Set(["Puka Nacua", "CeeDee Lamb", "Jaxon Smith-Njigba", "Drake London", "Kenneth Walker III", "Chase Brown", "Nico Collins", "Brock Bowers", "Chris Olave", "Zay Flowers", "Ladd McConkey", "Emeka Egbuka", "Quinshon Judkins", "Drake Maye", "Jordyn Tyson", "Christian Watson", "Parker Washington", "Tyler Warren", "Tucker Kraft", "Justin Herbert", "Jakobi Meyers", "Michael Wilson", "Alec Pierce", "Harold Fannin Jr.", "Kyler Murray", "Rachaad White", "Jalen Coker", "Jonathon Brooks", "Keaton Mitchell", "Jayden Higgins", "Jalen McMillan", "Tyjae Spears", "Jonah Coleman", "Antonio Williams", "DJ Giddens", "Jaylin Noel", "Dontayvion Wicks", "Marvin Mims Jr."]);
const CURATED_RISKY = new Set(["Christian McCaffrey", "De'Von Achane", "Jeremiyah Love", "Josh Allen", "Cam Skattebo", "Jadarian Price", "Tony Pollard", "Chuba Hubbard", "RJ Harvey", "Mark Andrews", "George Kittle", "Jake Ferguson", "Oronde Gadsden II"]);

function curatedTags(p){
  return {
    sleeper: CURATED_SLEEPERS.has(p.name),
    myGuy: CURATED_MY_GUYS.has(p.name),
    risky: CURATED_RISKY.has(p.name)
  };
}


const defaultState = {
  players: starterPlayers,
  needs:{QB:1,RB:2,WR:2,TE:1,FLEX:1},
  history:[]
};

let state = loadState();
let selectedId = null;
let currentTab = "board";
let tagFilter = "ALL";

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(saved && Array.isArray(saved.players)){
      // Always refresh rankings and reference tags from the current master board.
      // Preserve only user-specific favorites and draft status.
      const byName = new Map(saved.players.map(p => [p.name, p]));
      saved.players = starterPlayers.map(p => {
        const old = byName.get(p.name);
        return old ? {...p, favorite:!!old.favorite, status:old.status || "available"} : p;
      });
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
  const tags = curatedTags(p);
  const value = liveValue(p,rank-1);
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
        <span class="value-badge">VALUE ${value}</span>
        ${tags.sleeper?`<span class="tag tag-sleeper">SLEEPER</span>`:""}
        ${tags.myGuy?`<span class="tag tag-myguy">MY GUY</span>`:""}
        ${tags.risky?`<span class="tag tag-risky">RISKY / FADE</span>`:""}
        ${statusText?`<span>${statusText}</span>`:""}
      </div>
    </div>
    <div class="actions">
      <button class="icon-btn favorite-btn ${p.favorite?"starred":""}" aria-label="Favorite">${p.favorite?"★":"☆"}</button>
    </div>
  </article>`;
}

function matchesFilters(p){
  const q = $("#searchInput").value.trim().toLowerCase();
  const pos = $("#positionFilter").value;
  const tags = curatedTags(p);
  const tagMatch =
    tagFilter==="ALL" ||
    (tagFilter==="SLEEPER" && tags.sleeper) ||
    (tagFilter==="MYGUY" && tags.myGuy) ||
    (tagFilter==="RISKY" && tags.risky);
  return (!q || `${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(q))
    && (pos==="ALL" || p.pos===pos)
    && tagMatch;
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
function currentPickNumber(){
  return state.players.filter(p=>p.status!=="available").length + 1;
}

function basePlayerValue(rank){
  // Preserve a strong talent curve. Rank 1 ~= 100, rank 50 ~= 80,
  // rank 100 ~= 68, rank 250 ~= 40.
  const x=Math.max(0,Math.min(1,(rank-1)/249));
  return 100 - 60*Math.pow(x,.68);
}

function rosterFitAdjustment(p){
  const mine=mineByPos();
  const r=remainingNeeds();
  let adj=0;

  // Need helps, but only modestly. Talent/value must stay dominant.
  if(r[p.pos]>0) adj += 3.5;
  if(r.FLEX>0 && ["RB","WR","TE"].includes(p.pos)) adj += 1.5;

  // Filling a position never destroys an elite player's value.
  if(p.pos==="QB" && mine.QB>=state.needs.QB) adj -= 2.5;
  if(p.pos==="TE" && mine.TE>=state.needs.TE && r.FLEX===0) adj -= 2.5;
  if(["RB","WR"].includes(p.pos) && r[p.pos]===0 && r.FLEX===0) adj -= 1.0;

  // Small extra penalty only if you're truly overloaded.
  const starterTarget=state.needs[p.pos] ?? 0;
  const excess=Math.max(0,(mine[p.pos]||0)-starterTarget-1);
  adj -= Math.min(2.0,excess*.75);

  return Math.max(-4.5,Math.min(5,adj));
}

function scarcityAdjustment(p, rank){
  if(!["QB","RB","WR","TE"].includes(p.pos)) return 0;
  const nearby=state.players.filter((x,i)=>
    x.status==="available" &&
    x.id!==p.id &&
    x.pos===p.pos &&
    (i+1)>rank &&
    (i+1)<=rank+28
  ).length;

  if(nearby===0) return 4;
  if(nearby===1) return 3;
  if(nearby===2) return 2;
  if(nearby===3) return 1;
  return 0;
}

function liveValueDetails(p, idx){
  const rank=idx+1;
  const tags=curatedTags(p);
  const base=basePlayerValue(rank);

  // If a player survives beyond our rank, reward the discount.
  const fall=Math.max(0,currentPickNumber()-rank);
  const fallBonus=Math.min(12,fall*.35);

  const scarcity=scarcityAdjustment(p,rank);
  const roster=rosterFitAdjustment(p);

  let tag=0;
  if(tags.myGuy) tag+=2;
  if(tags.sleeper) tag+=1;
  if(tags.risky) tag-=3;
  if(p.favorite) tag+=1.5;

  const raw=base+fallBonus+scarcity+roster+tag;
  return {
    value:Math.round(Math.max(1,Math.min(100,raw))),
    base:Math.round(base*10)/10,
    fall:Math.round(fallBonus*10)/10,
    scarcity:Math.round(scarcity*10)/10,
    roster:Math.round(roster*10)/10,
    tag:Math.round(tag*10)/10,
    picksFallen:fall
  };
}

function liveValue(p, idx){
  return liveValueDetails(p,idx).value;
}

function recommendationScore(p, idx){
  return liveValue(p,idx);
}
function renderBest(){
  const r=remainingNeeds();
  $("#needsSummary").innerHTML = ["QB","RB","WR","TE","FLEX"].map(k=>`<span class="need ${r[k]>0?"hot":""}">${k}: ${r[k]} needed</span>`).join("");
  const arr = state.players.map((p,i)=>({p,i})).filter(x=>x.p.status==="available" && matchesFilters(x.p))
    .sort((a,b)=>{
      const diff=recommendationScore(b.p,b.i)-recommendationScore(a.p,a.i);
      return diff || a.i-b.i;
    }).slice(0,30);
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

function signed(v){
  if(v>0) return `+${v}`;
  return `${v}`;
}
function openSheet(){
  const p=state.players.find(x=>x.id===selectedId); if(!p)return;
  const idx=state.players.indexOf(p);
  const d=liveValueDetails(p,idx);
  $("#sheetPlayer").textContent=`${p.name} — ${p.pos} ${p.team}`;
  const fallText=d.picksFallen>0 ? ` • ${d.picksFallen} picks past our rank` : "";
  $("#sheetValue").innerHTML=`
    <div class="sheet-value-score">Live Value <strong>${d.value}</strong>${fallText}</div>
    <div class="value-breakdown">
      Base ${d.base} • Fall ${signed(d.fall)} • Scarcity ${signed(d.scarcity)} • Roster ${signed(d.roster)} • Tags ${signed(d.tag)}
    </div>`;
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
      myGuy:false,risky:false,favorite:false,status:"available"
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
document.querySelectorAll(".tag-filter").forEach(btn=>btn.onclick=()=>{
  tagFilter = btn.dataset.tag;
  document.querySelectorAll(".tag-filter").forEach(x=>x.classList.toggle("active",x===btn));
  renderAll();
});
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
