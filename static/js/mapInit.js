// function initialize() {
//     var map = new google.maps.Map(document.getElementById('map_canvas'), {
//         zoom: 15,
//         center: {lat: 31.825367, lng: 131.113944},
//         mapTypeControl: false,
//         zoomControl: true,
//         zoomControlOptions: {
//             position: google.maps.ControlPosition.LEFT_CENTER
//         },
//         mapTypeId: google.maps.MapTypeId.HYBRID,
//     });
//     var fieldsDB = [
//         {
//             path: [
//                 {lat: 31.82428, lng: 131.11491},
//                 {lat: 31.82419, lng: 131.11528},
//                 {lat: 31.82461, lng: 131.11543},
//                 {lat: 31.8247, lng: 131.11506},
//             ],
//             name: '下水流1',
//             item: '甘藷',
//             owner: '田中太郎',
//         }, {
//             path: [
//                 {lat: 31.81962, lng: 131.11677},
//                 {lat: 31.81896, lng: 131.11655},
//                 {lat: 31.81887, lng: 131.11696},
//                 {lat: 31.81954, lng: 131.11715},
//             ],
//             name: '下水流2',
//             item: '米',
//             owner: '山田花子',
//         }, {
//             path: [
//                 {lat: 31.81754, lng: 131.11584},
//                 {lat: 31.81686, lng: 131.11565},
//                 {lat: 31.81678, lng: 131.11605},
//                 {lat: 31.81746, lng: 131.11625},
//             ],
//             name: '下水流3',
//             item: '大根',
//             owner: '重冨裕貴',
//         },
//     ];
//
//     var someJavaScriptVar = '{{ fields }}';
//     console.log(someJavaScriptVar);
//
//     for (var i = 0; i < fieldsDB.length; ++i) {
//         eval("var path = fieldsDB[" + i + "]['path'];");
//         eval("var name = fieldsDB[" + i + "]['name'];");
//         eval("var item = fieldsDB[" + i + "]['item'];");
//         eval("var owner = fieldsDB[" + i + "]['owner'];");
//         var field = new google.maps.Polygon({
//             paths: path,
//             strokeWeight: 0,
//             fillColor: '#02C17B',
//             fillOpacity: 0.7
//         });
//         field.setMap(map);
//         attachFieldInfo(field, name, item, owner);
//     }
//     console.log("function_initialize");
// }

// function attachFieldInfo(field, name, item, owner) {
//     var infoWindow = new google.maps.InfoWindow;
//     var area = google.maps.geometry.spherical.computeArea(field.getPath());
//     area = (area / 100).toFixed(1);
//
//     field.addListener('click', function (event) {
//         var contentString = '<b>' + name + '</b><br>' + area +
//             ' a<br>' + item + '<br>地権者：' + owner;
//         infoWindow.setPosition(event.latLng);
//         infoWindow.setContent(contentString);
//         infoWindow.open(field.get('map'), field);
//
//     });
// }

function initialize() {
    // console.log("function_initialize_pop");
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/ishidaw175/ciz1bi2v4000r2rq7ihws96al/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXNoaWRhdzE3NSIsImEiOiJjaXoxYjgxbmQwNG95MnFweGYxcGpndWJ4In0.0ExWqRMLnkprkCax26aoHQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        // id: 'your.mapbox.project.id',
        // accessToken: 'your.mapbox.public.access.token'
    }).addTo(mymap);
}

function initialize_play() {
    console.log("function_initialize_play");
    var lonLat = {};
    lonLat.latitude = [];
    lonLat.longitude = [];
    lonLat_list = [];
    // lonLat_list = {};

    var play_map = new google.maps.Map(document.getElementById('play_canvas'), {
        zoom: 15,
        center: {lat: 31.825367, lng: 131.113944},
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeId: google.maps.MapTypeId.HYBRID,
    });

    var marker = new google.maps.Marker({
        position: play_map.getCenter(),
        map: play_map
    });

    google.maps.event.addListener(play_map, 'click', function (e) {
        var loc = e.latLng;
        marker.setPosition(loc);
        // lonLat.latitude.push(loc.lat());
        // lonLat.longitude.push(loc.lng());
        // $("#play").val("["+ lonLat.latitude + "]");

        // lonLat_list.append([lonLat.latitude[-1], lonLat.longitude[-1]]);
        // lonLat_list.append([loc.lat(), loc.lng()]);
        // lonLat_list.push([loc.lat(), loc.lng()]);
        // a_lonLat_list = String([loc.lat(), loc.lng()]);
        // lonLat_list[lonLat_list.length] = [];
        // lonLat_list[lonLat_list.length] = [loc.lat(), loc.lng()];
        lonLat_list[lonLat_list.length] = '[' + loc.lat() + ',' + loc.lng() + ']' ;
        // lonLat_list.push([loc.lat(), loc.lng()]);
        $("#play").val("["+ lonLat_list + "]");
    });
    console.log("function_initialize_play2");
}