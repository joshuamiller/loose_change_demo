## Loose Change / GeoCouch Demo

This is a demonstration application to show you how to get started using [Loose Change](http://github.com/joshuamiller/loose_change) and [GeoCouch](http://github.com/vmx/couchdb) to managed location-aware data.

## Getting Started

1. Install GeoCouch (instructions available via [github](http://github.com/vmx/couchdb)).

2. Clone this repository.

3. Have Ruby 1.9 and bundler installed on your system, and run `bundle install` from the project root.

4. Run `rake db:seeds` from the project root, which will copy the lake
data from lakes.csv into CouchDB (see db/seeds.rb to see how this
happens).  The lakes data is via the [USGS](http://geonames.usgs.gov/domestic/download_data.htm).

5. Run `rails server` and check it out!

## How It Works

### The Model

The Lake model, in app/models/lake.rb, is a simple LooseChange model
with two normal properties (`name` and `state`) and a spatial point
property `loc`, which is set as a `[lat,lng]` array.

### The Controller

By declaring the geo_point property, LooseChange gives us a
`by_bounding_box` method that allows us to find all documents whose
position is within the bounding box defined by two points (SW and NE
corners, respectively).  We find those documents and return them as
JSON to the UI.

### The Front End

Most of the work here is done in JavaScript, in
public/javascripts/application.js.  On document ready, we try the
HTML5 geolocation API (see (a good demo at html5demos.com)[http://html5demos.com/geo]) to get the user's location, or fall back on a
predefined point near the middle of the US.  Once we have the center
position, we initialize the map (see documentation for the [Google
Maps
API](http://code.google.com/apis/maps/documentation/javascript/)). When
the map is drawn, and any time the map is redrawn, we call a function
`retrieveLakes` which makes an AJAX call to the application to
retrieve a JSON array of lakes within the current bounds. For each
lake, we generate a marker with its name and state and place it on the
map.  On re-draws, v3 of the Google Maps API requires you to manually
clear the markers from the map.
