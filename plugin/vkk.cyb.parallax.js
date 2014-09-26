if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function objCreator () {};
        objCreator.prototype = obj;
        return new objCreator ();
    };
}

(function ($) {
	'use strict';
	
	var windowHeight = $(window).height();
		
	var Parallax = {
		init: function (userParam, el) {
			var self = this;
			self.el = $(el);
			self.firstTop;
			self.options = $.extend({}, $.fn.vkkCybParallax.options, userParam);
			
			//self.el.each(function(){
				self.firstTop = self.el.position().top;
			//});
			
			// this block of code use to check window resize after 250 ms
			var resizeInterval;
			$(window).resize( function() {
				clearTimeout(resizeInterval);
				resizeInterval = setTimeout( function() {
					windowHeight = $(window).height();
					self.update();
				}, 250);
			});
			
			$(window).on('scroll', function () {self.update()});			
		},//end of funt	
		
		update: function () {
			var pos = $(window).scrollTop();
			var self = this;
			
			self.el.each(function (index) {				
				var top = $(this).position().top;
				var height = $(this).outerHeight();
	
				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}
				
				$(this).css('background-position-y', Math.round((self.firstTop - pos) * self.options.speedFactor));
			});
		},//end of funt		
	}//end of obj
	
	$.fn.vkkCybParallax = function (userParam) {
		var parallax = Object.create(Parallax);
		parallax.init(userParam, this);
		return this;
	}
	
	$.fn.vkkCybParallax.options = {
		speedFactor: 0.1,
	}
})(jQuery);