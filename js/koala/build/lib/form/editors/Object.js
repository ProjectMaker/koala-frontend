define(['module'
        ,'underscore'
        ,'backboneForms'],
		
function( module
		,_
		) {
	
	var Object = Backbone.Form.editors.Object.extend({
		render: function() {
			//Get the constructor for creating the nested form; i.e. the same constructor as used by the parent form
			var NestedForm = this.form.constructor;
			
			//Create the nested form
			this.nestedForm = new NestedForm({
			  schema: this.schema.subSchema,
			  model: this.form.model,
			  data: this.value,
			  idPrefix: this.id + '_',
			  Field: this.form.NestedField
			});
			
			this._observeFormEvents();
			
			this.$el.html(this.nestedForm.render().el);
			
			if (this.hasFocus) this.trigger('blur', this);
				
			return this;
		},
		
		getNestedForm: function() { return this.nestedForm; }
		
	});
	
	return Object;
});