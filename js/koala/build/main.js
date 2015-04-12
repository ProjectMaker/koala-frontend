require.config({
	urlArgs: 'v=' + (new Date()).getTime(),
	packages: [{name: 'Connexion', main: 'app', location: 'modules/Connexion'}],
	paths: {
		'jquery': 'external/jquery',
		'jquery-ui': 'external/jquery-ui',
		'jqueryplugin': 'external/jqueryplugin',
		'text': 'external/text',
		'async': 'external/require-async-plugin',
		'ui-datepicker': 'external/jqueryplugin/ui-datepicker-fr',
		'underscore': 'external/underscore',
		'backbone': 'external/backbone',
		'backboneMarionette':'external/backbone-marionette',
		'backboneRelational':'external/backbone-relational',
		'backbonePaginator':'external/backbone.paginator',
		'backboneForms':'external/backbone-forms-amd'
	},
	map: {
		'*': {
			'jquery': 'external/jquery-private',
			'backboneRelational': 'external/backbone-relational-private'
			
		},
		'external/jquery-private': {
			'jquery': 'jquery'
		},
		'external/backbone-relational-private': {
			'backboneRelational': 'backboneRelational'
		}
	},
	shim: {
		'jquery-ui': ['jquery'],
		'ui-datepicker': ['jquery-ui'],
		'backboneForms': ['backbone','underscore','jquery'],
		'backboneMarionette': {
			exports: 'Marionette',
			deps: ['backbone']
		},
		'backboneRelational': ['backbone'],
		'backbonePaginator': ['backbone','underscore'],
		'backbone': {
			exports: 'Backbone',
			deps: ['underscore','jquery']
		}
	}
});
/*
require(['jquery'
         ,'UserStory1/config'
         ], 
	function($,conf) {
		var linkCss = $('<link>');
		$(linkCss).attr('rel','stylesheet');
		$(linkCss).attr('type','text/css');
		$(linkCss).attr('href',conf.urlCss + "/autocomplete.css");
		$("head").append(linkCss);
	}	
);
*/