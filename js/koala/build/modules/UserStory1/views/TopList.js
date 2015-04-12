define(['module'
        ,'underscore'
        ,'backbone'
        ,'backboneMarionette'
        ,'UserStory1/config'
        ,'UserStory1/collections/Places'
        ,'text!UserStory1/templates/TopList.html'
        ,'backboneRelational'],
		
function( module
		,_
		,Backbone
		,Marionette
		,conf
		,Places
		,TplTop
		) {
	
	var PlaceItemView = Marionette.ItemView.extend({
		template: _.template("<%= name %><br><img src='<%= img%>' />"),
		tagName: 'li'
	});
	
	var PlaceListView = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'top-list-theme',
		childView: PlaceItemView
	});
	
	var TopListView = Marionette.CompositeView.extend({
		template: _.template(TplTop),
		childView: PlaceItemView,
		childViewContainer: '.top-list-themes',
		
		refresh: function(theme) {
			this.children.each( function(view) {
				if ( view.collection.at(0).get('theme').get('code') == theme.get('code') ) {
					view.$el.show();
				}
				else view.$el.hide();
			}, this);
		},
		initialize: function() {
			this.name = 'top';
		},
		
		buildChildView: function(model) {
			return new PlaceListView({collection: model.get('places')});
		},
		
		onRender: function() {
			this.children.each( function(view) { view.$el.hide() });
			this.children.findByIndex(0).$el.show();
		},
		remove: function() {
			console.log('remove toplist');
			Marionette.ItemView.prototype.remove.apply(this, arguments);
		}
	});
	
	return TopListView;
});