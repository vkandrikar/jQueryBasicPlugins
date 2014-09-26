if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function objCreator () {};
        objCreator.prototype = obj;
        return new objCreator ();
    };
}

(function ($) {
	'use strict';
	
	var Shorten = {
		init: function (userParam, el) {
			var self = this;
			self.el = $(el);
			
			self.options = $.extend({}, $.fn.vkkCybShorten.options, userParam);
			
			self.applyShortened();
		},//end of funt
		
		applyShortened: function () {			
			var self = this;
			
			if (self.el.hasClass('shortened'))
				return;
			
			self.el.addClass('shortened');
			
			var opt = self.options;
			var content = self.el.text();
			if (content.length > opt.maxChar) {
				var visibleTxt = content.substr(0, opt.maxChar);//substr(from, length)
				var hiddenTxt = content.substring(opt.maxChar);//substring(from, to)
				var htmlTxt = visibleTxt + '<span class="ellipses">' + opt.ellipsesTxt + '</span><span class="moreContent"><span>' + hiddenTxt + '</span> <a href="#" class="moreTxt">' + opt.moreTxt + '</a></span>';
				
				self.el.html(htmlTxt);			
				self.el.find('.moreContent span').hide();
				
				self.el.find('.moreTxt').off('click');
				self.el.find('.moreTxt').on('click', function () {self.toggleTxt(this)});
			}
		},//end of funt
		
		toggleTxt: function (btn) {
			if (!$(btn).hasClass('less')) {
				$(btn).addClass('less');
				$(btn).text(this.options.lessTxt);
			} else {
				$(btn).removeClass('less');
				$(btn).text(this.options.moreTxt);
			}
			$(btn).parent().prev().toggle();
			$(btn).prev().toggle();
		},//end of funt
	}//end of obj
	
	$.fn.vkkCybShorten = function (userParam) {
		var shorten = Object.create(Shorten);
		shorten.init(userParam, this);
		return this;
	}
	
	$.fn.vkkCybShorten.options = {
		maxChar: 10,
		lessTxt: 'less',
		moreTxt: 'more',
		ellipsesTxt: '...'
	}
})(jQuery);