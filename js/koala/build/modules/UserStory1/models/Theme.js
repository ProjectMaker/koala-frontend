define(['module'
        ,'UserStory1/config'
        ,'UserStory1/models/Place'
        ,'UserStory1/collections/Places'
        ,'backboneRelational'],
		
function( module
		,conf
		,Place
		,Places
		) {
	
	var Theme = Backbone.RelationalModel.extend({
		defaults: {
			name: '',
			code: '',
			color: 'red'
		},
		
		relations: [{
			type: Backbone.HasMany,
			key: 'places',
			collectionType: Places,
			relatedModel: Place,
			includeInJSON: null,
				
			reverseRelation: {
				key: 'theme',
				includeInJSON: ['code']			
			}		
		}],
	});
	
	Theme.setup();
	
	return Theme;
});