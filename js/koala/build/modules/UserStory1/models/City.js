define(['module'
        ,'UserStory1/config'
        ,'backboneRelational'],
		
function( module
		,conf
		) {
	
	var City = Backbone.RelationalModel.extend({
		defaults: {
			name: '',
			code: ''
		},
		label: function( ) { return this.get('name'); }
	});
	
	City.setup();
	
	return City;
});