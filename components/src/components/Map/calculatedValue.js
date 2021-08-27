let instanceId = instance.id;
// debugger;
let currentMap = document.getElementById(instanceId);
let mapIdElement = document.getElementById('mapid');
const linkPresent = document.getElementById('map-link');
const scriptPresent = document.getElementById('map-script');

console.log('instanceId: ', instanceId);
console.log('mapIdElement: ', mapIdElement);

if (!linkPresent && !scriptPresent) {
    let mapCSS = document.createElement('link');
    mapCSS.rel = 'stylesheet';
    mapCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    mapCSS.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    mapCSS.crossOrigin = 'anonymous';
    mapCSS.id = 'map-link';
    document.head.appendChild(mapCSS);

    let mapScript = document.createElement('script');
    mapScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    mapScript.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    mapScript.crossOrigin = 'anonymous';
    mapScript.id = 'map-script';
    document.head.appendChild(mapScript);
}

onMapClick = (e) => {
    alert("You clicked the map at " + e.latlng);
    let x = document.querySelector('input[type="text"]');
    x.value = e.latlng;
}

if (linkPresent && scriptPresent) {
    let mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJ1eHRvZXMiLCJhIjoiY2tycW1vejRiOHlvaDJ6bWZuYmdhNDR2dCJ9.ltLK9tnOyJUuw_fiDMAffw'
    }).addTo(mymap);

    mymap.on('click', onMapClick);
    console.log('================================= MAP LOADED =================================');
}

setTimeout(() => {
    instance.setValue('Setting value for manual refresh');
}, 100);
