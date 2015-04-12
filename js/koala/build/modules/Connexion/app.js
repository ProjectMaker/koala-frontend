define(['module'
        ,'backbone'
        ,'jquery'
        ,'lib/utils/Store'
        ,'Connexion/config'
        ,'Connexion/collections/Users'
        ,'Connexion/views/AllUsers'
        ],
        
function(module
		,Backbone
		,$
		,store
		,conf
		,Users
		,AllUsersView
		 ) {
	
	$(document).ready(function() {
		console.log('yo');
		var users = new Users();
		$.when(users.fetch()).then( function() {
			$('#app').append(new AllUsersView({collection:users}).render().el);
		}).fail(function() {
			console.log('fail');
		});
		/*
		var MyApplication = Marionette.Application.extend({
			regions: {
				mainRegion: '#app'		
			},
			initialize: function(options) {},
			onStart: function() {
				this.appView = new AppView();
				this.mainRegion.show(this.appView);
			}		
		});
		*/
		
		
		
		
		/*
		var myApp = new MyApplication();
		myApp.start();
		*/
	});
	
	
});