Template.contactUs.onCreated(function() {
  var markers = [
    {
      lat: 28.46391, lng: -81.37006, title: 'Orlando',
      content: '<center><h3>Orlando Office</h3><p>6421 Pinecastle Blvd., Suite 1<br/>Orlando, FL 32809<br/>407-226-1168<br/>407-226-7076</p></center>'
    },
    {
      lat: 36.10024, lng: -115.14175, title: 'Las Vegas',
      content: '<center><h3>Las Vegas Office</h3><p>4945 Wilbur St.<br/>Las Vegas, NV 89119<br/>702-262-7851<br/>702-262-1940</p></center>'
    },
    {
      lat: 41.79301, lng: -87.77957, title: 'Chicago',
      content: '<center><h3>Chicago Office</h3><p> 6334 S Archer Ave. Suite B<br/>Chicago, IL 60632</p></center>'
    },
    {
      lat: 29.99649, lng: -90.15848, title: 'New Orleans',
      content: '<center><h3>New Orleans Office</h3><p> 2601 N. Hullen St.<br/>Metairie, LA 70002<br/>504-483-8055<br/>504-483-8056</p></center>'
    },
    {
      lat: 25.74844, lng: -80.32393, title: 'Miami',
      content: '<center><h3>Miami Office Office</h3><p>7901 SW 24th St.<br/>Miami, FL 33155</p></center>'
    }
  ]
  GoogleMaps.ready('locationsMap', function(map) {
    _.each(markers, function(item) {
      var marker = new google.maps.Marker({
        position: {lat:item.lat, lng:item.lng},
        title: item.title,
        map: map.instance
      });
      var infowindow = new google.maps.InfoWindow({
        content: item.content
      });
      marker.addListener('click', function() {
        infowindow.open(map.instance, marker);
      });
    });
  });
})

Template.contactUs.onRendered(function() {
  GoogleMaps.load();
});

Template.contactUs.helpers({
  locationsMapOptions: function() {
    if (GoogleMaps.loaded()) {
      return  {
        center: new google.maps.LatLng(37.09024, -95.712891),
        zoom: 4,
        scrollwheel: false
      }
    }
  }
})
