/*
	1) (function() {}) ==> self-enclosed JavaScript pattern, we’re making sure that all the variables\
	in our plugin will stay safely outside of the global namespace.
	
	2) we’re defining our plugin as if jQuery was in it’s “no-conflict” mode. Again, we’re seeking to 
	avoid colliding with other JavaScript on the page, and thus we want to make sure that our plugin 
	isn’t reliant on the default $
	
	3) $.fn is jQuery’s way of allowing you to define your plugin
*/

(function($) {

    $.fn.YouTubePlayer = function() {

        

    }

}(jQuery));
