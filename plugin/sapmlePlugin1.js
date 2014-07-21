/*
	1) (function() {}) ==> self-enclosed JavaScript pattern, we’re making sure that all the variables
	in our plugin will stay safely outside of the global namespace.
	
	2) we’re defining our plugin as if jQuery was in it’s “no-conflict” mode. Again, we’re seeking to 
	avoid colliding with other JavaScript on the page, and thus we want to make sure that our plugin 
	isn’t reliant on the default $
	
	3) $.fn is jQuery’s way of allowing you to define your plugin
	
	4) It's good practice when writing plugins to only take up one slot within $.fn
*/

/*
//not recomanded
(function( $ ) {
 
    $.fn.openPopup = function() {
        // Open popup code.
    };
 
    $.fn.closePopup = function() {
        // Close popup code.
    };
 
}( jQuery ));

//this is recomanded
(function( $ ) {
 
    $.fn.popup = function( action ) {
 
        if ( action === "open") {
            // Open popup code.
        }
 
        if ( action === "close" ) {
            // Close popup code.
        }
 
    };
 
}( jQuery ));
*/

(function($) {
    $.fn.samplePlugin = function(options) {			
		var setting = $.extend({}, {
			name: 'vijay',
			location: 'CT2',
			city: null,
			fontColor: 'black',
			callbackFunt: null
		}, options);
				
		$(this).text(setting.name);
		$(this).css('color', setting.fontColor);
		
		return this.each(function () {
			if ($.isFunction(setting.callbackFunt)) {
				setting.callbackFunt.call(this, setting);
			}
		});
    }
})(jQuery);