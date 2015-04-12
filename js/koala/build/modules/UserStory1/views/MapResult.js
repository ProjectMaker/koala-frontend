define(['module'
        ,'jquery'
        ,'underscore'
        ,'backbone'
        ,'backboneMarionette'
        ,,'UserStory1/config'
        ,'async!http://maps.google.com/maps/api/js?sensor=false'],
		
function( module
		,$
		,_
		,Backbone
		,Marionette
		,conf
		) {
	
	var MapPlaces = Marionette.ItemView.extend({
		template: _.template("<div class='map-places' style='width:500px;height:380px;background-color:black;'></div>"),
		tagName: 'div',
		//className: 'map-places',
		
		initialize: function() {
			this.markers = [];
			
			this.bindCollection();
		},
		
		bindCollection: function() {
			_.each(this.collection.models, function(theme) {
				theme.get('places').bind('sync', this.addMarkers, this);
				theme.get('places').bind('reset', this.addMarkers, this);
			}, this);
				
		},
		unbindCollection: function() {
			_.each(this.collection.models, function(theme) {
				theme.get('places').unbind('sync', this.addMarkers);
				theme.get('places').unbind('reset', this.addMarkers);
			}, this);
		},
		
		changeCollection: function(collection) {
			this.unbindCollection();
			this.collection = collection;
			this.bindCollection();
			this.addMarkers();
		},
		
		onRender: function() {
			var mapProp = {
		    	mapTypeId:google.maps.MapTypeId.ROADMAP
		  	};
			this.map = new google.maps.Map($('.map-places', this.el).get(0),mapProp);
			
			this.infowindow = new google.maps.InfoWindow({ size: new google.maps.Size(50,50) });
			
			this.addMarkers();
		},
		
		removeMarkers: function() {
			_.each(this.markers, function(marker) {
				google.maps.event.clearListeners(marker, 'click');
				marker.setMap(null);
			});
		},
		
		addMarkers: function() {
			this.removeMarkers();
			this.infowindow.close();
			
			this.markers = [];
			var bounds = new google.maps.LatLngBounds();
			var anchor = '';
			console.log(this.collection.at(0).get('places'));
			_.each(this.collection.at(0).get('places').models, function(place) {
				console.log(place.get('geoloc')['lat']);
				var myLatlng = new google.maps.LatLng(place.get('geoloc')['lat'],place.get('geoloc')['lng']);
				bounds.extend(myLatlng);
				var marker = new google.maps.Marker({ position: myLatlng,
													    title:place.get('name') });
				var oThis = this;
				google.maps.event.addListener(marker, 'click', function() {
					console.log('ooo');
					if ( oThis.infowindow.getContent() == this.title ) {
						oThis.infowindow.content = null;
						oThis.infowindow.close();
					}
					else {
						oThis.infowindow.close();		
						oThis.infowindow.setContent(this.title);
						oThis.infowindow.open(oThis.map,this);		
					}
				}); 
				marker.setMap(this.map);
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/' + this.collection.at(0).get('color') + '-dot.png')
				this.markers.push(marker);
		  	}, this);
		  	
		  	this.map.fitBounds(bounds);
			this.map.panToBounds(bounds);
		},
		
		remove: function() {
			this.unbindCollection();
			this.removeMarkers();
			this.map.unbindAll();
			Marionette.ItemView.prototype.remove.apply(this, arguments);
		}
	});
	
	return MapPlaces;
});