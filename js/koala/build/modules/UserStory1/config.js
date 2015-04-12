define(function(require) {
	
	var module = require('module');
	
	return module.config ? module.config() : {};
});