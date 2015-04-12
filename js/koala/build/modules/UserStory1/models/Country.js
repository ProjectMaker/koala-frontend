define(['module'
        ,'UserStory1/config'
        ,'UserStory1/models/City'
        ,'backboneRelational'],
		
function( module
		,conf
		,City
		) {
	
	var Country = Backbone.RelationalModel.extend({
		defaults: {
			name: '',
			code: ''			
		},
		
		relations: [{
			type: Backbone.HasMany,
			key: 'cities',
			relatedModel: City,
			includeInJSON: null,
				
			reverseRelation: {
				key: 'country',
				includeInJSON: ['code']			
			}		
		}],
		
		label: function( ) { return this.get('name'); }
	});
	
	Country.setup();
	
	return Country;
})