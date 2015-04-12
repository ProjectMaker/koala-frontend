define(['jquery','underscore'],
	function($,_) {
		
		function TabPageResult(target, options) {
			console.log('TabPageResult');
			this.setOptions(options);
		}
		
		$.extend(TabPageResult.prototype, {
			setOptions: function(hOptions) {
				var opt = {
					table_id : 'resultTable',
					highlight_class:'HighLight',
					header_checkbox: 'resultTableHdrChkbx',
					sort_template: '<a href="index.cfm?sortElement={EL}&sortOption={OPT}">{LBL}</a>',
					sortable_elements:'',
					sort_element: '',
					sort_options: ['asc','desc'],
					sort_option: 'desc',
					sort_class: { asc: 'tabOrderAsc', desc:'tabOrderDesc' },
					checkboxes_name: 'ListItem',
					alert_title:'Warning',
					alert_message:'You must check at least one item',
					header_pos:0,
					start_row:1,
					non_clickable_col:[0],
					page_location:'',
					href_params: [],
					href_global_params: {},
					href: {
						'new': {
							url: '#',
							layout:'tab',
							title: null,
							valid_handler:function() { return true; }
						},
						'newfromtemplate':{
							url: '#',
							layout:'popup',
							depend:'new',
							title: null,
							valid_handler:function() { return true; }
						},
						'saveasmodel':{
							url: '#',
							layout:'popup',
							title: null,
							valid_handler:function() { return true; }
						},
						'loadmodel':{
							url: '#',
							layout:'popup',
							title: null,
							valid_handler:function() { return true; }
						},
						'copy':{
							url:'#',
							layout:'tab',
							title: null,
							valid_handler:function() { return true; },
							iframe_id: 'copy_' + this._genId()
						},
						'rename': {
							url:'#',
							layout:'popup',
							title: null,
							height:320,
							width:880,
							valid_handler:function() { return true; }
						},
						'edit':{
							url:'#',
							layout:'tab',
							title: null,
							valid_handler:function() { return true; }
						},
						'preview':{
							url: '#',
							layout:'popup',
							title: null,
							valid_handler:function() { return true; }
						},
						'load':{
							url: '#',
							layout:'popup',
							title: null,
							valid_handler:function() { return true; }
						},
						'delete':{
							url:'#',
							layout:'popup',
							title: null,
							width:880,
							valid_handler:this.check_checkboxes.bind(this)
						},
						'move':{
							url:'#',
							layout:'popup',
							title: null,
							width:500,
							valid_handler:this.check_checkboxes.bind(this)
						}
					}
				}
				
				_.each(hOptions.href, function() {
					console.log(arguments);
				}, this);
				/*
				for (var i in hOptions.href) {
					try {
						hOptions.href[i] = Object.extend(opt.href[i] || {}, hOptions.href[i]);
					}
					catch(oExc){}
				}
	
				this.options = Object.extend(opt,hOptions);
				this.options.href = $H(this.options.href);
				if ( this.options.href_params.length <= 0) {
					this.options.href_params.push({});
				}
				var k = this.options.href.keys();
				for(var i=0; i<k.length; i++){
					if (typeof this.options.href[k[i]].valid_handler == 'undefined'){
						this.options.href[k[i]].valid_handler = this._true;
					}
					if (typeof this.options.href[k[i]].layout == 'undefined'){
						this.options.href[k[i]].layout = 'tab';
					}
				}
				*/
			},
			
			check_checkboxes: function() {
				
			},
			
			_genId: function() {
				var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123459789';
				var value = '';
				var rnum;
				for (var i = 0; i < 16; i++) {
					rnum = Math.floor(Math.random() * chars.length);
					value += chars.substring(rnum, rnum + 1);
				}
				return 'TabPageResult' + value;
			}
		});
		
		
		$.fn.tabPageResult = function(options) {
			new TabPageResult(this, options);
			//$(this).css('color', 'red');
			/*
			this.each(function() {
				$(this).css('color', 'red');
			});
			*/
			return this;
		}
	}	
);

