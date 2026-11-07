// Immer zuerst das Netz, ohne Netz die letzte Kopie (nur Geheimtext, ohne Passwort nutzlos)
const SPEICHER = 'warframe-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const kopie = r.clone();
    caches.open(SPEICHER).then(c => c.put(e.request, kopie));
    return r;
  }).catch(() => caches.match(e.request)));
});
