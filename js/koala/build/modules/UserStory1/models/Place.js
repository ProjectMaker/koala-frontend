define(['module'
        ,'UserStory1/config'
        ,'backboneRelational'],
		
function( module
		,conf
		) {
	
	var Place = Backbone.RelationalModel.extend({
		defaults: {
			id: '',
			name: '',
			address: '',
			geoloc: {},
			rating: -1,
			types: '',
			img: '',
			placeId: '',
			reference: ''
		}
	});
	
	Place.setup();
	
	return Place;
});