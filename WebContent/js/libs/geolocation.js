define([],function(){
var geolocation = {
	
		initialize: function(){
			google.maps.event.addDomListener(window, 'load');
			geocoder = null,map = null;
			geocoder = new google.maps.Geocoder();
			  var latlng = new google.maps.LatLng(-34.397, 150.644);
			  var mapOptions = {
			    zoom: 8,
			    center: latlng
			  }
			  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		},
		codeAddress : function(pincode){
			var address = pincode;
			  geocoder.geocode( { 'address': address}, function(results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			      map.setCenter(results[0].geometry.location);
			      var marker = new google.maps.Marker({
			          map: map,
			          position: results[0].geometry.location
			      });
			    } else {
			      alert('Geocode was not successful for the following reason: ' + status);
			    }
			  });
		}
		
};
return geolocation;
});