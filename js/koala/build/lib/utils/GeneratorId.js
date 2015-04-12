define(['underscore'],
		
function(_) {
	var instance = null;
	
	var GeneratorId = function GeneratorId( ) {
		if ( instance !== null ) throw new Error('Cannot instantiate more than one GeneratorId');
		
		this.initialize();
	}
	
	_.extend(GeneratorId.prototype, {
		initialize: function() {
			this._id = 0;
		},
		
		getNewId: function() {
			this._id++;
			return this._id;				
		},
		
		addId: function(id) {
			if ( this._id < id ) this._id = id;		
		}
	
	});
	
	GeneratorId.getInstance = function() {
		if ( instance === null ) instance = new GeneratorId();
		return instance;
	}
	
	return GeneratorId.getInstance();
});