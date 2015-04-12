define(['module'
        ,'underscore'
        ,'backbone'
        ,'Connexion/config'
        ,'Connexion/models/User'
        ,'backboneRelational'
        ,'backbonePaginator'],
		
function( module
		,_
		,Backbone
		,conf
		,User
		) {
	
	var Users = Backbone.PageableCollection.extend({
		url: conf.urlSync + '/User',
		model: User,
		mode: 'client',
		
		initialize: function() {
			console.log(conf.urlSync);
			//this.setPageSize(5);
		},
		comparator: function(item) { 
			return item.get('pseudo');
		}
	});
	
	return Users;
});