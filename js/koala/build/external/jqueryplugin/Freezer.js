define(['jquery',
        'underscore'],
	

    function($,_) {
		var Freezer = function Freezer(target, settings) {
			this._defaults = {
				className: 'UIFreezer',
				zIndex: 199
			};
			$.extend(this._defaults, settings);

			this._defaults.classNameContainer = 'UIFreezerContainer';
			this._scrollTimeout = null;
			
			this.render();
		}
		
		$.extend(Freezer.prototype, {
			getDocHeight: function() {
				var db = document.body;
				var dde = document.documentElement;
				 
				var docHeight = Math.max(db.scrollHeight, dde.scrollHeight, db.offsetHeight, dde.offsetHeight, db.clientHeight, dde.clientHeight);
				
				return docHeight;
			},
			
			render: function() {
				var container = $('<div></div>');
				$(container).addClass(this._defaults.classNameContainer);
				$(container).css('zIndex',this._defaults.zIndex);
				$(container).width($(document).width());
				$(container).height($(document).height());
				
				var content = $('<div></div>');
				$(content).addClass(this._defaults.className);
				$(content).css('zIndex',this._defaults.zIndex + 1);
				$(container).append(content);
				$(document.body).append($(container));
				
				$(window).bind('scroll', $.proxy(this.showScroll, this));
				$(window).bind('resize', $.proxy(this.setPosition, this));
			},
			
			showResize: function() {
				$('.' + this._defaults.classNameContainer).height(document.body.clientHeight);
			},
			
			showScroll: function() {
				var oThis = this;
				if ( this._scrollTimeout ) clearTimeout(this._scrollTimeout);
				this._scrollTimeout = setTimeout(function() { oThis.setPosition.apply(oThis) }, 10);
			},
			
			setPosition: function() {
				var scrollTop = $(document).scrollTop();
				var width = window.innerWidth;
				var height = window.innerHeight;
				var contentTop = ( height / 2 ) - ( $('.' + this._defaults.className).height() / 2 ) + scrollTop;
				var contentLeft = ( width / 2 ) - ( $('.' + this._defaults.className).width() / 2 );
				$('.' + this._defaults.className).css('top', contentTop + 'px');
				$('.' + this._defaults.className).css('left', contentLeft + 'px');
			},
			
			show: function() {
				this.setPosition();
				$('.' + this._defaults.classNameContainer).show();
			},
			
			hide: function() {
				$('.' + this._defaults.classNameContainer).hide();
			},
			
			dispose: function() {
				this._scrollTimeout = null;
				$(window).unbind('scroll', $.proxy(this.showScroll, this));
				$(window).unbind('resize', $.proxy(this.setPosition, this));
				$('.' + this._defaults.classNameContainer).remove();
			}
		});
		
		return Freezer;
	}
);