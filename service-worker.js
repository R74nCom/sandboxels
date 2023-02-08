self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
       try{
         var res = await fetch(event.request);
         var cache = await caches.open('cache');
         cache.put(event.request.url, res.clone());
         return res;
       }
       catch(error){
         return caches.match(event.request);
        }
      }());
  });