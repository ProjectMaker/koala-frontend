define(['module'
        ,'underscore'
        ,'backbone'
        ,'UserStory1/config'
        ,'UserStory1/models/Place'
        ,'backboneRelational'
        ,'backbonePaginator'],
		
function( module
		,_
		,Backbone
		,conf
		,Place
		) {
	
	var Places = Backbone.PageableCollection.extend({
		url: conf.urlSync + '/Place',
		model: Place,
		mode: 'client',
		
		initialize: function() {
			//this.setPageSize(5);
		},
		comparator: function(item) { 
			return -(item.get('rating'));
		},
		
		getTheme: function(themeCode) {
			return _.find(this.models, function(model) { return model.get('theme').get('code') == themeCode});
		}
	});
	
	return Places;
});