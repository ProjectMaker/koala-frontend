define(['underscore'],
		
function(_) {
	var instance = null;
	
	var Store = function Store( ) {
		if ( instance !== null ) throw new Error('Cannot instantiate more than one Store');
		
		this.initialize();
	}
	
	_.extend(Store.prototype, {
		initialize: function() {
			this._store = {};
		},
		
		add: function(key,value) {
			this._store[key] = value;
		},
		
		get: function(key) {
			if ( !this._store[key] ) return;
			return this._store[key];
		}
	
	});
	
	Store.getInstance = function() {
		if ( instance === null ) instance = new Store();
		return instance;
	}
	
	return Store.getInstance();
});