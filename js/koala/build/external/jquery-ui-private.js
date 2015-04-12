define(['jquery'],
		
	function($) {
		var hasAddedCss = false;
		
		UICss = {
			add: function() {
				if ( !hasAddedCss ) {
					console.log('ioio');
					var linkCss = $('<link>');
					$(linkCss).attr('rel','stylesheet');
					$(linkCss).attr('type','text/css');
					$(linkCss).attr('href',conf.pathCss + "/jquery-ui-1.8.23.custom.css");
					$("head").append(linkCss);
					hasAddedCss = true;
				}
			}
		}
	
		UICss.add();
	
	}
);
