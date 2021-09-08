
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          '/dynamic/index.html',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

self.addEventListener('fetch', e=>{

  
  
  //   // 2- Cache with network fallback
  //   //Verificamos que exista 
  //   const cwnf = caches.match(e.request)
  //   .then(res=>{
    //     if(res) return res;
    //     //si no existe
    //     console.log('No existe '+ e.request.url);
    
    //     //buscamos el archivo con un fetch
    //     return fetch(e.request)
    //             .then(newRes => {
      //               caches.open(CACHE_STATIC_NAME)
      //               .then(cache =>{
        //                 cache.put(e.request, newRes)
        //               })
        //               return newRes.clone()
        //             })
        
        //   })
        //   e.respondWith(cwnf)
        // })
        
        
        // --------------------------------------
        
        
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

        // 5 -

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(function(err) {

//             });
//         }
//       })
//   );
})