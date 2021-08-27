/* tslint:disable */
import { Components } from 'formiojs';
import editForm from './Component.form';
import { Constants } from '../Common/Constants';

const HTMLComponent = (Components as any).components.base;
const ID = 'htmlelement';

export default class Component extends (HTMLComponent as any) {
  static schema(...extend) {
    return HTMLComponent.schema({
      label: 'HTML',
      type: ID,
      tag: 'div',
      customConditional: "let instanceId = instance.id;\r\n// debugger;\r\nlet currentMap = document.getElementById(instanceId);\r\nlet mapIdElement = document.getElementById('mapid');\r\nconst linkPresent = document.getElementById('map-link');\r\nconst scriptPresent = document.getElementById('map-script');\r\n\r\nconsole.log('instanceId: ', instanceId);\r\nconsole.log('mapIdElement: ', mapIdElement);\r\n\r\nif (!linkPresent && !scriptPresent) {\r\n    let mapCSS = document.createElement('link');\r\n    mapCSS.rel = 'stylesheet';\r\n    mapCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';\r\n    mapCSS.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';\r\n    mapCSS.crossOrigin = 'anonymous';\r\n    mapCSS.id = 'map-link';\r\n    document.head.appendChild(mapCSS);\r\n\r\n    let mapScript = document.createElement('script');\r\n    mapScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';\r\n    mapScript.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';\r\n    mapScript.crossOrigin = 'anonymous';\r\n    mapScript.id = 'map-script';\r\n    document.head.appendChild(mapScript);\r\n}\r\n\r\nonMapClick = (e) => {\r\n    alert(\"You clicked the map at \" + e.latlng);\r\n    let x = document.querySelector('input[type=\"text\"]');\r\n    x.value = e.latlng;\r\n}\r\n\r\nif (linkPresent && scriptPresent) {\r\n    let mymap = L.map('mapid').setView([51.505, -0.09], 13);\r\n\r\n    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {\r\n        attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n        maxZoom: 18,\r\n        id: 'mapbox/streets-v11',\r\n        tileSize: 512,\r\n        zoomOffset: -1,\r\n        accessToken: 'pk.eyJ1IjoidHJ1eHRvZXMiLCJhIjoiY2tycW1vejRiOHlvaDJ6bWZuYmdhNDR2dCJ9.ltLK9tnOyJUuw_fiDMAffw'\r\n    }).addTo(mymap);\r\n\r\n    mymap.on('click', onMapClick);\r\n    console.log('================================= MAP LOADED =================================');\r\n}\r\n\r\nsetTimeout(() => {\r\n    instance.setValue('Setting value for manual refresh');\r\n}, 100);\r\n",
      calculateValue: "console.log('CALCULATED VALUE');\r\nlet instanceId = instance.id;\r\n// debugger;\r\nlet currentMap = document.getElementById(instanceId);\r\nlet mapIdElement = document.getElementById('mapid');\r\nconst linkPresent = document.getElementById('map-link');\r\nconst scriptPresent = document.getElementById('map-script');\r\n\r\nconsole.log('instanceId: ', instanceId);\r\nconsole.log('mapIdElement: ', mapIdElement);\r\n\r\nif (!linkPresent && !scriptPresent) {\r\n    let mapCSS = document.createElement('link');\r\n    mapCSS.rel = 'stylesheet';\r\n    mapCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';\r\n    mapCSS.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';\r\n    mapCSS.crossOrigin = 'anonymous';\r\n    mapCSS.id = 'map-link';\r\n    document.head.appendChild(mapCSS);\r\n\r\n    let mapScript = document.createElement('script');\r\n    mapScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';\r\n    mapScript.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';\r\n    mapScript.crossOrigin = 'anonymous';\r\n    mapScript.id = 'map-script';\r\n    document.head.appendChild(mapScript);\r\n}\r\n\r\nonMapClick = (e) => {\r\n    alert(\"You clicked the map at \" + e.latlng);\r\n    let x = document.querySelector('input[type=\"text\"]');\r\n    x.value = e.latlng;\r\n}\r\n\r\nif (linkPresent && scriptPresent) {\r\n    let mymap = L.map('mapid').setView([51.505, -0.09], 13);\r\n\r\n    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {\r\n        attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\r\n        maxZoom: 18,\r\n        id: 'mapbox/streets-v11',\r\n        tileSize: 512,\r\n        zoomOffset: -1,\r\n        accessToken: 'pk.eyJ1IjoidHJ1eHRvZXMiLCJhIjoiY2tycW1vejRiOHlvaDJ6bWZuYmdhNDR2dCJ9.ltLK9tnOyJUuw_fiDMAffw'\r\n    }).addTo(mymap);\r\n\r\n    mymap.on('click', onMapClick);\r\n    console.log('================================= MAP LOADED =================================');\r\n}\r\n\r\nsetTimeout(() => {\r\n    instance.setValue('Setting value for manual refresh');\r\n}, 100);\r\n",
      attrs: [
        {
          attr: 'style',
          value: 'height: 180px; border: 1px solid;'
        },
        {
          attr: 'id',
          value: 'mapid'
        },
      ],
      content: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static editForm = editForm;

  static get builderInfo() {
    return {
      title: 'Map',
      group: 'advanced',
      icon: 'code',
      weight: 70,
      documentation: Constants.DEFAULT_HELP_LINK,
      schema: Component.schema()
    };
  }
}
