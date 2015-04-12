define(['underscore'],
		
function(_) {
	
	var instance = null;
	
	var GroupCriteriaNameFactory = function GroupCriteriaNameFactory( ) {
		if ( instance !== null ) throw new Error('Cannot instantiate more than one GroupCriteriaNameFactory');
		
		this.initialize();
	}
	
	_.extend(GroupCriteriaNameFactory.prototype, {
		initialize: function() {
			this.name = null;
		},
		
		getName: function() {
			if ( !this.name ) {
				this.name = 65;
			}
			else {
				this.name++;
			}
			
			return String.fromCharCode(this.name);
		},
		
		addName: function(name) {
			if ( this.name < name.charCodeAt(0) ) this.name = name.charCodeAt(0);
		}
	});
	
	GroupCriteriaNameFactory.getInstance = function() {
		if ( instance === null ) instance = new GroupCriteriaNameFactory();
		return instance;
	}
	
	return GroupCriteriaNameFactory.getInstance();
});
	