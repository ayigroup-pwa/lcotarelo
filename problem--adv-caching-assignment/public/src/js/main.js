
var box = document.querySelector('.box');
var button = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('Registered Service Worker!');
    });
}

button.addEventListener('click', function(event) {
  if (box.classList.contains('visible')) {
    box.classList.remove('visible');
  } else {
    box.classList.add('visible');
  }
});

var url = 'https://httpbin.org/ip'
var networkResponse = false
fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data.origin);
    box.style.height = (data.origin.substr(0, 2) * 5) + 'px';
  });

if('caches' in window){
  caches.match(url)
  .then(res=>{
    if(res){
      res.json()
    }
  })
  .then(data=>{
    console.log('Data from cache ', data);
    if(!networkResponse){
    box.style.height = (data.origin.substr(0, 2) * 20) + 'px';

    }
  })
}
