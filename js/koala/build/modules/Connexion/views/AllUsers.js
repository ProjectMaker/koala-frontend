define(['module'
        ,'jquery'
        ,'underscore'
        ,'backbone'
        ,'backboneMarionette'
        ,'Connexion/config'
        ],
		
function( module
		,$
		,_
		,Backbone
		,Marionette
		,conf
		,map
		) {
	
    	var UserView = Marionette.ItemView.extend({
    		tagName: 'li',
    		template: _.template("<b><%= pseudo %></b>")
    	});
    	
    	var UsersView = Marionette.CollectionView.extend({
    		tagName: 'ul',
    		childView: UserView
    	});
    	
    	return UsersView;
});