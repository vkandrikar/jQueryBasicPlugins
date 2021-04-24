if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function objCreator () {};
        objCreator.prototype = obj;
        return new objCreator ();
    };
}

(function ($) {
	'use strict';
	
	var PluginObject = {
		init: function (userParam, el) {
			var self = this;
			self.el = $(el);
			
			self.options = $.extend({}, $.fn.vkkCybPunginName.options, userParam);			
		},//end of funt		
	}//end of obj
	
	$.fn.vkkCybPunginName = function (userParam) {
		var pluginInstance = Object.create(PluginObject);
		pluginInstance.init(userParam, this);
		return this;
	}
	
	$.fn.vkkCybPunginName.options = {
		
	}
})(jQuery);