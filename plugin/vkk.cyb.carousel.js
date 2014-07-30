// JavaScript Document

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function objCreator () {
		}
        objCreator.prototype = obj;
        return new objCreator ();
    };
}

(function ($) {
	'use strict';
	
	var myCarousel = {
		scrollCount: 0,
		maxScrollCount: 0,
		totalWidth: 0,
		
		init: function (options, el) {
			console.log('*** INIT CAROUSEL ***');
			var self = this;
			self.el = $(el);
			self.options = $.extend({}, $.fn.vkkCybCarousel.options, options);
			
			//if (self.isAllOk()) {
				if (self.options.jsonPath) {			
					self.loadContent();
				} else {
					self.createItems(null);
				}
				self.customEvents();
				
				
				// this block of code use to check window resize after 250 ms
				var resizeInterval;
				$(window).resize( function() {
					clearTimeout(resizeInterval);
					resizeInterval = setTimeout( function() {
						self.update();
					}, 250);
				});		
			//} 
		},//end of funt
		
		isAllOk: function () {
			var status = true;
			var opt = this.options;
			
			if (opt.nextBtn === null || opt.prevBtn === null)
				status = false;
				
			return status;
		},//end of funt
				
		loadContent: function () {
			var self = this;
			var opt = self.options
			
			if (typeof opt.jsonPath === 'string') {
				$.getJSON(opt.jsonPath).done( function (result) {
					if ($.isFunction(opt.jsonSuccessCallback)) 
						opt.jsonSuccessCallback.call(this, result);
				}).fail( function (jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
    				console.info( "Request Failed: " + err );
				});
			} else {
				console.info('please provide volid json url');
			}
		},//end of funt
		
		customEvents : function () {
            var self = this;
			
            self.el.on("vkkCybCarousel:onDataCreated", function (event, data) {
				self.createItems(data);
            });
				
        },//end of funt
		
		handleNavigationBtnClick: function (btn) {
			var opt = this.options;
			
			if (btn === 'next') {				
				if (this.scrollCount < this.maxScrollCount) {
					this.scrollCount++;
				} else {
					return;
				}
				if ($(opt.prevBtn).hasClass('deactiveNavBtn'))
					$(opt.prevBtn).removeClass('deactiveNavBtn');
			} else {
				if (this.scrollCount > 0) {
					this.scrollCount--;
				} else {
					return;
				}
				if ($(opt.nextBtn).hasClass('deactiveNavBtn'))
					$(opt.nextBtn).removeClass('deactiveNavBtn');				
			}
									
			if (this.scrollCount == 0) {
				$(opt.prevBtn).addClass('deactiveNavBtn');
			} else if (this.scrollCount == this.maxScrollCount) {
				$(opt.nextBtn).addClass('deactiveNavBtn');
			}
			
			this.scrollToIndex();
		},//end of funt
		
		scrollToIndex: function () {///for single item move do calculation
			var opt = this.options;
			var displayWidth = this.el.find('.maskVCC').width();
			var scrollDistance = this.scrollCount*(displayWidth+opt.liGap);
			
			if (opt.noOfItemToMove != 0) {
				scrollDistance = this.scrollCount*opt.noOfItemToMove*(this.el.find('.itemVCC').outerWidth()+opt.liGap) ;
			}			
			
			var maxDistance = this.totalWidth - displayWidth;						
			if (scrollDistance > maxDistance)
				scrollDistance =  maxDistance;
			
			this.el.find('ul').stop().animate({left: (scrollDistance*-1) + 'px'}, opt.scrollSpeed);
		},//end of funt
				
		applyCustomSetting: function () {
			var self = this;
			var opt = self.options;
			
			if (opt.thumbDisplayCount != 0) {
				var width = ((self.el.find('.itemVCC').outerWidth() + opt.liGap) * opt.thumbDisplayCount) - opt.liGap;
				self.el.css('width', width+'px');//;
			}
			
			if ($.isFunction(opt.itemClickCallback)) {
				self.el.find('.itemVCC').css('cursor', 'pointer');
				self.el.find('.itemVCC').on('click', function () {self.handleItemClick(this)});
			}
			
			this.calculateMaxScrollCount();
			
			if (opt.prevBtn && opt.nextBtn) {
				this.resetNavBtn();
				
				$(opt.prevBtn).on('click', function () {self.handleNavigationBtnClick('prev')});
				$(opt.nextBtn).on('click', function () {self.handleNavigationBtnClick('next')});
			} else {
				self.el.find('.maskVCC').css({'overflow-x': 'scroll', 'overflow-y': 'hidden'});
			}
		},//end of funt
		
		resetNavBtn: function () {
			var self = this;
			var opt = self.options;
			
			if (opt.prevBtn && opt.nextBtn) {
				$(opt.prevBtn).addClass('deactiveNavBtn');
				$(opt.nextBtn).removeClass('deactiveNavBtn');
				
				if (self.maxScrollCount == 0) 
					$(opt.nextBtn).addClass('deactiveNavBtn');
			}
		},
		
		calculateMaxScrollCount: function () {
			var opt = this.options;
			
			if (opt.noOfItemToMove == 0) {
				this.maxScrollCount = Math.floor((this.totalWidth-(this.el.find('.itemVCC').length*opt.liGap))/this.el.find('.maskVCC').width());
			} else {
				var displayWidth = this.el.find('.maskVCC').width();
				this.maxScrollCount = Math.ceil((this.totalWidth - displayWidth)/((this.el.find('.itemVCC').outerWidth() + opt.liGap) * opt.noOfItemToMove));
			}		
			//console.log("maxScrollCount: "+this.maxScrollCount)	
		},//end of funt
		
		handleItemClick: function (obj) {
			this.options.itemClickCallback.call(this, obj);
		},
		
		createItems: function (data) {
			var self = this;
			var opt = self.options;
			
			if (data != null) {
				self.el.append('<div class="maskVCC"></div>').find('.maskVCC').append('<ul></ul>').find('ul').append(data);			
				///self.el.find('.maskVCC').css('height', self.el.find('.itemVCC').height()+'px');				
			}
			
			self.el.find('.itemVCC').each(function (i, item) {
				$(item).css('left', ($(item).outerWidth() + opt.liGap)*i);		
			});
			
			var li = self.el.find('.maskVCC').find('li');
			var interval = setInterval( function () {
				if (li.find('img').height() > 0 || li.find('img').height() == null) {
					clearInterval(interval);
					self.el.css('height', li.outerHeight()+'px');					
					self.totalWidth = ((li.outerWidth() + opt.liGap + 0.1) * li.size()) - opt.liGap;					
					self.applyCustomSetting();
				}
			}, 100);
			
		},//end of funt
		
		update: function () {
			this.calculateMaxScrollCount();
			this.resetNavBtn();
			this.scrollCount = 0;
			if (this.el.find('ul').position().left < 0)
				this.el.find('ul').stop().animate({left: '0px'}, this.options.scrollSpeed);
		}//end of funt
	}//end of obj
	
	$.fn.vkkCybCarousel = function (options) {		
		var carousel = Object.create(myCarousel);
		carousel.init(options, this);	
		
		return this;	
	}//end of plugin
	
	$.fn.vkkCybCarousel.options = {
		jsonPath: null,
		jsonSuccessCallback: null,
		nextPrevScroll: false,
		nextBtn: null,
		prevBtn: null,
		thumbDisplayCount: 0,
		noOfItemToMove: 0,
		liGap: 5,
		scrollSpeed: 500,
		itemClickCallback: null,
	}//end of plugin options
	
})(jQuery);