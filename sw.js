﻿const dev = false, cI = "1", cC = self.caches, cUrl = "./,/index.html,/w.js,/i.png,/m.json".split(","); addEventListener('install', e => { e.waitUntil( cC.open(cI) .then(cache => cache.addAll(cUrl)) .then(skipWaiting()) ); }); addEventListener('activate', e => { e.waitUntil( cC.keys().then(cNS => { return cNS.filter(cN => !cI.includes(cN)); }).then(cD => { return Promise.all(cD.map(cD => { return cC.delete(cD); })); }).then(() => clients.claim()) ); }); addEventListener('fetch', e => { if (dev) return true; let req = e.request; if (req.method == "GET") { e.respondWith( cC.match(req, {cacheName:cI, ignoreVary:true}).then(cR => { if (cR) { return cR; } return cC.open(cI).then(c => { return fetch(req).then(rsp => { return c.put(req, rsp.clone()).then(() => { return rsp; }); }); }); }) ); } });