const CACHE="draft-board-v6.0.1";
const ASSETS=["./","./index.html","./styles.css?v=6.0.1","./players.js?v=6.0.1","./app.js?v=6.0.1","./manifest.json","./icon-192.png","./icon-512.png"];

self.addEventListener("install",e=>e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
));

self.addEventListener("activate",e=>e.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const url=new URL(e.request.url);
  const core=/\/(app\.js|players\.js|styles\.css|index\.html)$/.test(url.pathname) || url.pathname.endsWith("/");
  if(core){
    e.respondWith(
      fetch(e.request).then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return resp;
      }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return resp;
    }))
  );
});
