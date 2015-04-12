define(['module'
        ,'underscore'
        ,'backboneForms'],
		
function( module
		,_
		) {
	
	var Field = Backbone.Form.Field.extend({
		initialize: function(options) {
			Backbone.Form.Field.prototype.initialize.apply(this,arguments);
			if ( _.isString(this.template) ) this.template = _.template(this.template);
			this.form.on('render', _.bind(this.onFormRender, this));
		},
		
		onFormRender: function() {
			_.each(this.schema.bindings, function(binding) {
				var args = {};
				var field = this.form.fields[binding.target];
				args[binding.callbackName] = binding.callbackFct;
				_.extend(field.__proto__, args);
				
				this.form.on(this.key + ':change', _.bind(field[binding.callbackName], field, binding.filterParamName, binding.filterQuery, this));
			}, this);
			
			this.trigger('rendered');
		}
	});
	
	return Field;
});