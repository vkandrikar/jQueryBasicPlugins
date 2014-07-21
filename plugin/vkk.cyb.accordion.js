(function ($) {	
	'use strict';
	 
	$.fn.vkkCybAccordion = function (options) {
		
		var setting = $.extend({}, 
			{
				tabElement: 'li',
				openDefault: false,
				defaultTabIndex: 1,
				animationTime: 500,
				tabActiveClass: 'vkkCybAccordionTabDefaultActiveClass',
				callbackFunt: null
			}, options);
			
		
		this.each(function () {
			var tab = $(this).children(setting.tabElement);
			tab.on('click', handleTabClick);			
			tab.each(resetMe);
		});
		
		if (setting.openDefault) {	
			var tab = $(this).children(setting.tabElement + ':nth-of-type(' + setting.defaultTabIndex + ')');
			tab.addClass(setting.tabActiveClass);			
			
			tab.next().slideDown(setting.animationTime, 'linear', onContentShown);			
		}
			
		function handleTabClick (evt) {
			$(this).siblings(setting.tabElement).next().slideUp('fast');
			$(this).siblings(setting.tabElement).removeClass(setting.tabActiveClass);
			
			$(this).toggleClass( setting.tabActiveClass );
			$(this).next().slideToggle(setting.animationTime, 'linear', onContentShown);
						
			//ensures that any title bar that is clicked does not exhibit its usual behavior
			return false;
		}//end of funt	
		
		function onContentShown () {
			if ($.isFunction(setting.callbackFunt))
				setting.callbackFunt.call(this);
		}//end of funt
		
		function resetMe () {
			$(this).next().hide();
		}//end of funt
			
		return this;
	}//end of myAccordion
}(jQuery));
