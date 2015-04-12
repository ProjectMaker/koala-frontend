define(['module'
        ,'underscore'
        ,'jquery'
        ,'backbone'
        ,'backboneMarionette'
        ,'UserStory1/config'
        ,'lib/utils/Store'
        ,'UserStory1/collections/Places'
        ,'text!UserStory1/templates/Navigation.html'
        ,'backboneRelational'],
		
function( module
		,_
		,$
		,Backbone
		,Marionette
		,conf
		,store
		,Places
		,TplNavigation
		) {
	
	var ThemeItemView = Marionette.ItemView.extend({
		template: _.template('<a href="#"><%= name %></a>'),
		tagName: 'li',
		
		triggers: {
			'click': 'theme:click'
		}
	}) 
	
	var NavigationItemView = Marionette.CompositeView.extend({
		template: _.template(TplNavigation),
		childView: ThemeItemView,
		childViewContainer: '.navigation-themes',
		ui: {
			'themes': '.navigation-themes',
			'views': '.navigation-views'
		},
		triggers: {
			'click .navigation-view-top': 'view:show:top',
			'click .navigation-view-list': 'view:show:list',
			'click .navigation-view-map': 'view:show:map'
		},
		childEvents: {
			'theme:click': function(child) { this.trigger('showTheme', child.model); }
		}
		
	});
	
	return NavigationItemView;
	
});