define(['module'
        ,'Connexion/config'
        ,'backboneRelational'],
		
function( module
		,conf
		) {
	
	var User = Backbone.RelationalModel.extend({
		defaults: {
			pseudo: '',
			password: ''			
		}
	});
	
	User.setup();
	
	return User;
});