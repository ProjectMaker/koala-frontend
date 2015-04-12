define(['module'
        ,'underscore'
        ,'backbone'
        ,'backboneMarionette'
        ,'UserStory1/config'
        ,'lib/utils/Store'
        ,'text!UserStory1/templates/ApplicationLayout.html'
        ,'UserStory1/views/FormSearch'
        ,'UserStory1/views/MapList'
        ,'UserStory1/views/AllList'
        ,'UserStory1/views/TopList'
        ,'UserStory1/views/Navigation'
        ,'UserStory1/models/Theme'
        ,'UserStory1/models/PlaceSearch'
        ,'UserStory1/collections/Places'
        ,'backboneRelational'],
		
function( module
		,_
		,Backbone
		,Marionette
		,conf
		,store
		,TplApplicationLayout
		,FormSearchView  
		,MapListView 
		,AllListView
		,TopListView
		,NavigationView
		,Theme
		,PlaceSearch
		,Places
		) {
	
	var AppView = Marionette.LayoutView.extend({
		template: _.template(TplApplicationLayout),
		regions: {
			formRegion: '#form-search',
			navigationRegion: '#navigation',
			placesRegion: '#places'
		},
		
		initialize: function(options) {
			this.themes = new Backbone.Collection();
		},
		
		showViewTop: function() {
			console.log('showTopList');
			var placeSearch = this.formRegion.currentView.model;
			
			var topListView = new TopListView({model: placeSearch, collection:this.getThemes(5)});
			this.navigationRegion.currentView.bind('showTheme', topListView.refresh, topListView);
			this.placesRegion.show(topListView);
		},
		
		showViewList: function() {
			console.log('showViewList');
			var placeSearch = this.formRegion.currentView.model;
			
			var allListView = new AllListView({model: placeSearch, collection:this.getThemes(10)});
			this.navigationRegion.currentView.bind('showTheme', allListView.refresh, allListView);
			this.placesRegion.show(allListView);
		},
		
		showViewMap: function() {
			console.log('showViewList');
			var placeSearch = this.formRegion.currentView.model;
			
			var mapView = new MapListView({model: placeSearch, collection:this.getThemes(10)});
			
			//this.navigationRegion.currentView.bind('showTheme', allListView.refresh, allListView);
			this.placesRegion.show(mapView);
			
			
		},
		
		getThemes: function(pageSize) {
			return this.formRegion.currentView.model.get('themes');
			var themes = new Backbone.Collection();
			_.each(this.formRegion.currentView.model.get('themes').models, function(theme) {
				var _theme = theme.clone();
				_theme.get('places').setPageSize(pageSize);
				themes.add(_theme);
				_theme.get('places').fetch({data: {type: _theme.get('code')}}).done( function() { console.log('ok') } ).fail( function() { console.log('ko'); });
				
				//this.collection.bind('reset', this.addMarkers, this);
			});
			
			return themes;
		},
		
		onValidForm: function(placeSearch) {
			var navView = new NavigationView({collection: placeSearch.get('themes')});
			navView.bind('view:show:top', this.showViewTop, this);
			navView.bind('view:show:list', this.showViewList, this);
			navView.bind('view:show:map', this.showViewMap, this);
			this.navigationRegion.show(navView);
			_.each(this.formRegion.currentView.model.get('themes').models, function(theme) {
				theme.get('places').fetch({data: {type: theme.get('code')}}).done( function() { console.log('ok') } ).fail( function() { console.log('ko'); });
			},this);
			this.showViewTop();
			
		},
		
		onShow: function() {
			var places = null;
			var mapPlaces = null;
			var placeSearch = new PlaceSearch({country: 'France', city: 'Paris', themes: [store.get('themes').findWhere({code: 'R'})]});
			var formSearch = new FormSearchView({model: placeSearch});
			formSearch.bind('valid', _.bind(this.onValidForm, this), placeSearch);
			this.formRegion.show(formSearch);
			//this.places.show(places);
		}
	});
	
	return AppView;
});