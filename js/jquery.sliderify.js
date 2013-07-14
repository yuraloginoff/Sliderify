;(function($, window, document, undefined) {

	var defaults = {
		navigationClass : "sliderify-navigation",
		navigationElements : "button",
		navigationElementsClass : "sliderify-navigation-element",
		buttonBackText : "Prev",
		buttonForwardText : "Next",
		paginationClass : "sliderify-paginator",
		addPagination : true,
		speed : 400,
		easing : "swing"
	};

	function Sliderify(container, options) {
		this.container = container;
		this.list =  this.container.find("ul");
		this.config = $.extend({}, defaults, options);
		this.imgs = this.container.find('img');
		this.imgWidth = this.imgs[0].width;
		this.imgsLength = this.imgs.length;
		this.current = 0;

		this.init();
		this.bindEvents();		
	};

	Sliderify.prototype.init = function() {
		$("<div/>", {
			class : this.config.navigationClass
		}).appendTo(this.container);

		$("<" + this.config.navigationElements + "/>", {
			text : this.config.buttonBackText,
			"data-dir" : "prev",
			class : this.config.navigationElementsClass
		}).appendTo("." + this.config.navigationClass);

		$("<" + this.config.navigationElements + "/>", {
			text : this.config.buttonForwardText,
			"data-dir" : "next",
			class : this.config.navigationElementsClass
		}).appendTo("." + this.config.navigationClass);

		if (this.config.addPagination) {
			$("<div/>", {
				class : this.config.paginationClass
			}).appendTo(this.container);

			this.addSlideButtons("." + this.config.paginationClass);
		};
	};

	Sliderify.prototype.bindEvents = function() {
		var self = this,
			paginationElement = $("." + this.config.paginationClass);

		$("div." + this.config.navigationClass)
			.find(this.config.navigationElements)
			.on("click", function(e) {
				//Prevent multiple fast clicking.
				if (self.list.is(":animated")) {
					return false;
				} else {
					var dir = $(this).data('dir');
					self.setCurrent(dir);
					self.transition();
					self.highlightCurrent(paginationElement);
					e.preventDefault();
				};
			});

		$("div." + this.config.paginationClass)
			.find("a")
			.on("click", function(e) {
				//Prevent multiple fast clicking.
				if (self.list.is(":animated")) {
					return false;
				} else {
					var slide = $(this).data('slide');
					self.setCurrent(null, slide);
					self.transition();
					self.highlightCurrent(paginationElement);
					e.preventDefault();
				};				
			});
	};

	Sliderify.prototype.transition = function() {
		this.container.find("ul").animate({
			'margin-left' : -(this.current * this.imgWidth)
		}, this.config.speed, this.config.easing);
	}

	Sliderify.prototype.setCurrent = function(direction, tinyCurrent) {
		var pos = this.current;
		(direction === 'next') ? pos++ : pos--;	
		this.current = ( pos < 0 ) ?  this.imgsLength - 1 : pos % this.imgsLength;

		if ( tinyCurrent !== undefined ) {
			this.current = tinyCurrent;
		}		
	}

	Sliderify.prototype.addSlideButtons = function(linksWrap) {
		for (var i = this.imgsLength - 1; i >= 0; i--) {
			$('<a/>', {
					href: '#',
					text: i + 1,
					"data-slide" : i
				})
				.prependTo(linksWrap)
				.addClass( (i === 0) ? 'active' : '' );
		};
	}

	Sliderify.prototype.highlightCurrent = function(linksWrap) {
		linksWrap
			.find('a[data-slide="' + this.current + '"]')
			.addClass('active')
			.siblings()
			.removeClass('active');
	}

	$.fn.sliderify = function(options) {
		new Sliderify(this.first(), options);
		return this.first();
	};

})(jQuery, window, document);