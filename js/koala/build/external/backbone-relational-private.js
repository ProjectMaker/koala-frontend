define(['backboneRelational'],
		
	function() {
		Backbone.RelationalModel.extend = function( protoProps, classProps ) {
			var child = Backbone.Model.extend.apply( this, arguments );
			
			return child;
		};
		
	}
);
