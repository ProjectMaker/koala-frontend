define(['module'
        ,'UserStory1/config'
        ,'UserStory1/models/Theme'
        ,'backboneRelational'],
		
function( module
		,conf
		,Theme
		) {
	
	var SearchPlace = Backbone.RelationalModel.extend({
		defaults: {
			country: '',
			city: '',
			themes: []
		},
		
		relations: [{
			type: Backbone.HasMany,
			key: 'themes',
			relatedModel: Theme		
		}],
	});
	
	SearchPlace.setup();
	
	return SearchPlace;
});