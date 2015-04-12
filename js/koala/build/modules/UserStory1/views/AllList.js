define(['module'
        ,'underscore'
        ,'backbone'
        ,'backboneMarionette'
        ,'UserStory1/config'
        ,'UserStory1/collections/Places'
        ,'text!UserStory1/templates/AllList.html'
        ,'text!UserStory1/templates/PlacesList.html'
        ,'backboneRelational'],
		
function( module
		,_
		,Backbone
		,Marionette
		,conf
		,Places
		,TplAllList
		,TplPlacesList
		) {
	
	var PlaceItemView = Marionette.ItemView.extend({
		template: _.template("<td><%= rating %></td><td><%= name %></td><td><%= address %></td>"),
		tagName: 'tr'
	});
	
	var PlaceListView = Marionette.CompositeView.extend({
		template: _.template(TplPlacesList),
		childView: PlaceItemView,
		childViewContainer: '.body-container-places',
		events: {
			'click .bt-previous': function() {
				if ( this.collection.state.currentPage > 1 ) {
					this.collection.getPreviousPage();
					this.trigger('previous');
				}
			},
			'click .bt-next': function() {
				if ( this.collection.state.currentPage < this.collection.state.totalPages ) {
					this.collection.getNextPage();
					this.trigger('next');
				}
			}
		},
		ui: {
			themeName: '.theme-name',
			btPrevious: '.bt-previous',
			btNext: '.bt-next'
		},
		initialize: function(options) { 
			this.name = 'all';
			this.collection.bind('sync', this.refresh, this);
			this.collection.bind('reset', this.refresh, this);	
		},
		
		refresh: function() {
			this.ui.themeName.html(this.collection.at(0).get('theme').get('name'));
		}
	});
	
	var AllListView = Marionette.CompositeView.extend({
		template: _.template(TplAllList),
		childView: PlaceListView,
		childViewContainer: '.all-list-themes',
		
		refresh: function(theme) {
			this.children.each( function(view) {
				if ( view.collection.at(0).get('theme').get('code') == theme.get('code') ) {
					view.$el.show();
				}
				else view.$el.hide();
			}, this);
		},
		
		buildChildView: function(model) {
			return new PlaceListView({collection: model.get('places')});
		},
		
		onRender: function() {
			this.children.each( function(view) { view.$el.hide() });
			this.children.findByIndex(0).$el.show();
		}
	});
	
	return AllListView;
});