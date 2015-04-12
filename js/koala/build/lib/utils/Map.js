define(['underscore'
        ,'jquery'
        ,'UserStory1/config'
        ,'async!http://maps.google.com/maps/api/js?sensor=false'
        ],
		
function(_
		,$
		,conf
		
		) {
	var instance = null;
	
	var Map = function Map( ) {
		if ( instance !== null ) throw new Error('Cannot instantiate more than one Map');
		
		this.initialize();
	}
	
	_.extend(Map.prototype, {
		initialize: function() {
			this.map = null;
			this.markers = [];
		},
		
		getBounds: function() {
			var lls = [new google.maps.LatLng(-34.397,150.644), new google.maps.LatLng(-34.000,150.644)];
			var bounds = new google.maps.LatLngBounds();
			_.each(lls, function(ll) {
				bounds.extend(ll);
			});
			
			return bounds;
		},
		
		getBounds2: function() {
			var lls = [new google.maps.LatLng(34.397,150.644), new google.maps.LatLng(34.000,150.644)];
			var bounds = new google.maps.LatLngBounds();
			_.each(lls, function(ll) {
				bounds.extend(ll);
			});
			
			return bounds;
		},
		
		addMarkers: function() {
			var bounds = new google.maps.LatLngBounds();
			var myLatlng = new google.maps.LatLng(34.397,150.644);
			bounds.extend(myLatlng);
			var marker = new google.maps.Marker({ position: myLatlng,
												    title:"YO" });
			marker.setMap(this.map);
			this.markers.push(marker);
			var myLatlng = new google.maps.LatLng(34.000,150.644);
			bounds.extend(myLatlng);
			var marker = new google.maps.Marker({ position: myLatlng,
												    title:"YO" });
			marker.setMap(this.map);
			this.markers.push(marker);
			/*
			this.map.setCenter(bounds.getCenter());
			this.map.fitBounds(bounds);
			console.log(this.map.getZoom());
			*/
			/*
			this.map.setZoom(this.map.getZoom()-1);
			if(this.map.getZoom()> 15){
				  this.map.setZoom(15);
				}
			*/
			//this.map.panToBounds(bounds);
				
				//google.maps.event.trigger( this.map, 'resize');
		},
		
		removeMarkers: function() {
			_.each(this.markers, function(marker) {
				google.maps.event.clearListeners(marker, 'click');
				marker.setMap(null);
			});
		},
		
		add: function($el) {
			if ( !this.map ) {
				var mapProp = {
					//center: { lat: -34.397, lng: 150.644},
					zoom: 8,
			    	mapTypeId:google.maps.MapTypeId.ROADMAP
			  	};
				$eltMap = $("<div style='width:500px;height:380px;'></div>");
				$el.append($eltMap);
				this.map = new google.maps.Map($eltMap.get(0),mapProp);
				this.map.fitBounds(this.getBounds());
			}
			else {
				//var style = $('#map-cached').attr('style');
				
				//var map = this.map.getDiv();
				//$el.css('display','');
				$el.append(this.map.getDiv());
				
				
				
				//this.map.setCenter(new google.maps.LatLng(-34.397,150.644));
				//this.map.setZoom(8);
				
				//this.addMarkers();
				//google.maps.event.trigger( this.map, 'resize');
				this.map.fitBounds(this.getBounds2());
				//this.map.panToBounds(this.getBounds2());
				//console.log('iii');
				//this.map.setCenter(this.map.getCenter());
			}
			//this.map.fitBounds(this.getBounds());
		},
		
		remove: function($el) {
			if ( $('#map-cached div').length == 0 ) {
				//this.removeMarkers();
				//this.map.unbindAll();
				var style = $el.attr('style');
				$('#map-cached').attr('style', style);
				$('#map-cached').css('display','none');
				
				$('#map-cached').append(this.map.getDiv());
			}
		}
	
	});
	
	Map.getInstance = function() {
		if ( instance === null ) instance = new Map();
		return instance;
	}
	
	return Map.getInstance();
});