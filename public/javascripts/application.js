// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var map;
var markers = [];

$(function() {

  var latlng = new google.maps.LatLng(38.8, -90.2);

  if (navigator.geolocation) {
//    initializeMap(latlng);
    navigator.geolocation.getCurrentPosition(
      function(pos) { 
        var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        initializeMap(latlng); }, 
      function() { 
        initializeMap(latlng); 
      });
  } else {
    initializeMap(latlng);
  }

});    
   
function initializeMap(latlng) { 
  console.log("trying...");
  console.log(latlng);
  var myOptions = {
    zoom: 5,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
    myOptions);
  google.maps.event.addListener(map, 'bounds_changed', function() { retrieveLakes(map.getBounds().toString()); });
  
}
  
function retrieveLakes(bounds) {
  var bbox = bounds.replace(/\(*|\)*|\s*/gi, '');
  $.each(markers, function(i, marker) { marker.setMap(null) });
  markers.length = 0;
  $.getJSON('/lakes?bbox=' + bbox, 
            function(data) { 
              $.each(data, function(i, lake) {
                markers.push(new google.maps.Marker({
                  position: new google.maps.LatLng(lake.loc[0], lake.loc[1]),
                  map: map,
                  title: lake.name + ', ' + lake.state
                }));
              });
            });
}
