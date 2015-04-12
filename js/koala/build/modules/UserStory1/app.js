define(['module'
        ,'backbone'
        ,'jquery'
        ,'lib/utils/Store'
        ,'UserStory1/config'
        ,'UserStory1/models/Country'
        ,'UserStory1/models/City'
        ,'UserStory1/models/Theme'
        ,'UserStory1/collections/Places'
        ,'UserStory1/views/ApplicationLayout'
        ],
        
function(module
		,Backbone
		,$
		,store
		,conf
		,Country
		,City
		,Theme
		,Places
		,AppView
		 ) {
	
	$(document).ready(function() {
		var MyApplication = Marionette.Application.extend({
			regions: {
				mainRegion: '#app'		
			},
			initialize: function(options) {},
			onStart: function() {
				this.appView = new AppView();
				this.mainRegion.show(this.appView);
			}		
		});
		
		var countries = new Backbone.Collection();
    	countries.add(new Country({code: 'EN', name: 'Angleterre'}));
    	countries.at(0).get('cities').add(new City({code: 'LONDON', name: 'Londres'}));
    	countries.add(new Country({code: 'FR', name: 'France'}));
    	countries.at(1).get('cities').add(new City({code: 'PARIS', name: 'Paris'}));
    	countries.at(1).get('cities').add(new City({code: 'LYON', name: 'Lyon'}));
    	countries.at(1).get('cities').add(new City({code: 'TOULOUSE', name: 'Toulouse'}));
    	store.add('countries', countries);
    	
    	var themes = new Backbone.Collection();
    	themes.add(new Theme({code: 'R', name: 'Restaurants', color: 'green'}));
    	themes.add(new Theme({code: 'B', name: 'Bars', color: 'blue'}));	    	
		store.add('themes', themes);
		
		
		
		
		var myApp = new MyApplication();
		myApp.start();
	});
	
	
});