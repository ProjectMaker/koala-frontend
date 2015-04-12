define(['module'
        ,'underscore'
        ,'backboneForms'],
		
function( module
		,_
		) {
	
	var Select = Backbone.Form.editors.Select.extend({
		setOptions: function(options) {
			if ( _.isString(options) ) options = eval(options);
			if ( _.isFunction(options) ) {
				var result = options();
		    	this.renderOptions(result);
			}
			else Backbone.Form.editors.Select.prototype.setOptions.apply(this, arguments);
			
			this.$el.get(0).selectedIndex = 0;
		},
		
		_collectionToHtml: function(collection) {
			var array = [];
		    collection.each(function(model) {
		      array.push({ val: model.get(this.schema.modelKeys.key), label: model.get(this.schema.modelKeys.value) });
		    }, this);
		
		    //Now convert to HTML
		    var html = this._arrayToHtml(array);
		    return html;
		}
	});
	
	return Select;
});