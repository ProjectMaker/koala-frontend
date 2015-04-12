define(['module'
        ,'underscore'
        ,'backbone'
        ,'backboneForms'],
		
function( module
		,_
		,Backbone
		) {
	
	var Checkboxes = Backbone.Form.editors.Checkboxes.extend({
		_collectionToHtml: function(collection) {
			var array = [];
		    collection.each(function(model) {
		      array.push({ val: model.get(this.schema.modelKeys.key), label: model.get(this.schema.modelKeys.value) });
		    }, this);
		
		    //Now convert to HTML
		    var html = this._arrayToHtml(array);
		    return html;
		},
		
		setValue: function(values) {
			if ( values instanceof Backbone.Collection ) {
				var _values = [];
				_.each(values.models, function(model) { _values.push(model.get(this.schema.modelKeys.key)); }, this);
				values = _values;
			}
			
			Backbone.Form.editors.Checkboxes.prototype.setValue.apply(this, arguments);
		},
		
		getValue: function() {
			var values = [];
			var _values = Backbone.Form.editors.Checkboxes.prototype.getValue.apply(this, arguments);
			_.each(_values, function(val) {
		    	var args = {};
		    	args[ this.schema.modelKeys.key ] = val;
		    	values.push(this.schema.options.findWhere(args));
		    }, this);
			
			return values;
		}
	});
	
	return Checkboxes;
});