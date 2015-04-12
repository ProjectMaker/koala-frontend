define(['module'
        ,'underscore'
        ,'jquery'
        ,'lib/utils/Store'
        ,'UserStory1/models/City'
        ,'UserStory1/models/Country'
        ,'UserStory1/models/Theme'
        ,'lib/form/editors/Select'
        ,'lib/form/editors/Checkboxes'
        ,'lib/autocomplete/AutoCompleteView'
        ,'text!UserStory1/templates/FormSearch.html'
        ,'text!UserStory1/templates/FormField.html'
        ,'backboneForms'],
		
function( module
		,_
		,$
		,store
		,City
		,Country
		,Theme
		,KlSelect
		,KlCheckboxes
		,AutoCompleteView
		,TplFormSearch
		,TplFormField
		) {
	
	var FormSettings = Backbone.Form.extend({
		template: _.template(TplFormSearch),
		Field: Backbone.Form.Field.extend({
			template: _.template(TplFormField)		
		}),
		i18n: {
			country: 'Pays',
			city: 'Ville',
			themes: 'Themes'
		},
		schema: {
	   		'country': {
	   			fieldClass: 'searchcountry',
				type: 'Text',
				validators: ['required']
	        },
	        'city': {
	        	type: 'Text',
	        	fieldClass: 'searchtown',
	        	validators: ['required']
	        },
	        'themes': {
	        	fieldClass: 'searchtheme',
	        	type: KlCheckboxes,
	        	options: [],
	        	modelKeys: { key: 'code', value: 'name' }
	        }
	    },
	    initialize: function(options) {
	    	Backbone.Form.prototype.initialize.apply(this, arguments);
	    	this.fields['themes'].schema.options = store.get('themes');
	    	this.acCityView = null;
	    	this.addSchemaTitles();
	    },
	    
	    addSchemaTitles: function() {
	    	_.each(this.schema, function(schema, key) {
	    		this.fields[key].schema.title = this.i18n[key];
	    	}, this);
	    },
	    
	    onSelectCity: function(city) {
	    	this.fields['themes'].$el.show();
	    },
	    
	    onSelectCountry: function(country) { 
	    	var country = store.get('countries').findWhere({name: country.get('name')});
	    	if ( this.acCityView ) {
	    		this.fields['city'].setValue('');
	    		this.fields['themes'].$el.hide();
	    		this.acCityView.remove();
	    	}
	    	this.acCityView = new AutoCompleteView({input:$('.city', this.el), minKeywordLength:0, model: country.get('cities'), onSelect: _.bind(this.onSelectCity, this)}).render();
	    	this.fields['city'].$el.show();
	    },
	    
	    addContents: function() {
	    	new AutoCompleteView({input:$('.country', this.el), model: store.get('countries'), minKeywordLength:0, onSelect: _.bind(this.onSelectCountry, this)}).render();
	    },
	    
	    addEvents: function() {
	    	$('.bt-valid-form', this.el).bind('click', _.bind( function() {
	    		var error = this.validate();
	    		
	    		if ( _.isEmpty(error) ) {
	    			this.commit();
	    			this.trigger('valid', this.model);
	    		}
	    		
	    	}, this));
	    },
	    
	    render: function() {
	    	Backbone.Form.prototype.render.apply(this, arguments);
	    	this.addContents();
	    	this.addEvents();
	    	
	    	if ( !this.model.get('city') ) this.fields['city'].$el.hide();
	    	if ( !this.model.get('themes') ) this.fields['themes'].$el.hide();
	    	
	    	return this;		    
	    }
	});
	
	return FormSettings;
});