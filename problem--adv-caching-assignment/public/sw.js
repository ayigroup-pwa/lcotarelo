
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var STATIC_FILES= [
          '/',
          '/index.html',
          '/offline.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          '/dynamic/index.html',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]
self.addEventListener('install', e=> {
  e.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(cache=> {
        cache.addAll(STATIC_FILES);
      })
  )
});

self.addEventListener('activate', e=> {
  e.waitUntil(
    caches.keys()
      .then(keyList=> {
        return Promise.all(keyList.map(key=> {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) {
    cachePath = string.substring(self.origin.length);
  } else {
    cachePath = string;
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', e=>{

  // 1-La estrategia empleada originalmente es cache con network fallback porque primero
  // va a buscar info en la cache y espera la respuesta. Si no hay respuesta,
  // actualiza la respuesta con la response del fetch(event.request)
  

          // --------------------------------------

  //   2 - Network only
  //   e.respondWith(fetch(e.request))

  // //3 - Cache Only
  // e.respondWith(caches.match(e.request))
                
  // --------------------------------------
        
  // //4 - Network with cache fallback

  // const respuesta = fetch(e.request)
  // .then(res =>{
  //   if(!res) return caches.match(e.request)

  //   caches.open(CACHE_DYNAMIC_NAME)
  //   .then(cache =>{
  //     cache.put(e.request,res)
  //   })
  //   return res.clone()
  // }). catch(error=>{
  //   return caches.match(e.request)
  // })

  // e.respondWith(respuesta)
        
        
        // --------------------------------------

  // 5- Cache with network fallback
  //   e.respondWith(
//     caches.match(e.request)
//       .then(res =>{
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(cache => {
//                   cache.put(e.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(error=> {
//                return caches.match(e.request)
//             });
//            .catch(error=>  {
//              return caches.open(CACHE_STATIC_NAME)
//                .then(cache => {
//                if (e.request.headers.get('accept').includes('text/html')) {
//                return cache.match('/offline.html');
//             }

//         }
//       })
//   );

  // 6 - 

  var url = 'https://httpbin.org/ip';
  if (e.request.url.indexOf(url) > -1) {
    e.respondWith(
      fetch(e.request)
          .then( res=> {
            return caches.open(CACHE_DYNAMIC_NAME)
              .then(cache=> {
                cache.put(e.request.url, res.clone());
                return res;
              })
          })
    );
  } else if (isInArray(e.request.url, STATIC_FILES)) {
    e.respondWith(
      caches.match(e.request)
    );
  } else {
    e.respondWith(
      caches.match(e.request)
        .then(response=> {
          if (response) return response;
          else {
            return fetch(e.request)
              .then(res=> {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(cache=> {
                    cache.put(e.request.url, res.clone());
                    return res;
                  })
              })
              .catch(error=> {
                return caches.open(CACHE_STATIC_NAME)
                  .then(cache=> {
                    if (e.request.headers.get('accept').includes('text/html')) {
                      return cache.match('/offline.html');
                    }
                  });
              });
          }
        })
    );
  }
})
