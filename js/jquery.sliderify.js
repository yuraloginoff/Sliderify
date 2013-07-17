;(function($, window, document, undefined) {

	var defaults = {
		navigationClass : "sliderify-navigation",
		navigationElements : "button",
		navigationElementsClass : "sliderify-navigation-element",
		buttonBackText : "Prev",
		buttonForwardText : "Next",
		addPagination : true,
		paginationClass : "sliderify-paginator",		
		speed : 400,
		easing : "swing",
		transitionEffect : "slide",
		showStatus : true,
		statusText : " of ",
		statusClass : "sliderify-status"
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

		this.paginator = $("." + this.config.paginationClass);		
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

		if (this.config.navigationElements === "a") {
			$("." + this.config.navigationElementsClass).attr("href", "#");
		};

		if (this.config.addPagination) {
			$("<div/>", {
				class : this.config.paginationClass
			}).appendTo(this.container);

			this.addNavigationElements();
		};
		
		if (this.config.transitionEffect == "fade") {
			this.imgs.css("opacity", 0).first().animate({
				opacity : 1
			}, this.config.speed);
		}

		if (this.config.showStatus) {
			this.addStatus();
		};
	};

	Sliderify.prototype.bindEvents = function() {
		var self = this;

		$("div." + this.config.navigationClass)
			.find(this.config.navigationElements)
			.on("click", function(e) {
				//Prevent multiple fast clicking.
				if (self.list.is(":animated") || self.imgs.is(":animated")) {
					return false;
				} else {
					var dir = $(this).data('dir');
					self.setCurrent(dir);
					self.transition();
					e.preventDefault();
				};
			});

		$("div." + this.config.paginationClass)
			.find("a")
			.on("click", function(e) {
				//Prevent multiple fast clicking.
				if (self.list.is(":animated") || self.imgs.is(":animated")) {
					return false;
				} else {
					var slide = $(this).data('slide');
					self.setCurrent(null, slide);
					self.transition();
					e.preventDefault();
				};				
			});
	};

	Sliderify.prototype.transition = function() {
		if (this.config.transitionEffect == "slide") {
			this.animationSlide();
		} else if (this.config.transitionEffect == "fade") {
			this.animationFade();
		};
	};

	Sliderify.prototype.animationSlide = function() {
		var self = this;

		this.list.animate({
			"margin-left" : -(this.current * this.imgWidth)
		}, {
			duration : this.config.speed,
			easing : this.config.easing,
			complete : function() {
				self.updateStatus();
				self.highlightCurrent();				
			}
		});
	};

	Sliderify.prototype.animationFade = function() {
		var self = this;

		this.list.animate({
			"margin-left" : -(this.current * this.imgWidth)				
		}, 0, this.config.easing);
		
		$(this.imgs[this.current]).animate({
			opacity : 1
		}, {
			duration: this.config.speed,
			complete : function() {
				$(this).parent("li").siblings().children("img").css("opacity", 0);
				self.updateStatus();
				self.highlightCurrent();
			}
		});
	};

	Sliderify.prototype.setCurrent = function(direction, tinyCurrent) {
		var pos = this.current;
		(direction === 'next') ? pos++ : pos--;	
		this.current = ( pos < 0 ) ?  this.imgsLength - 1 : pos % this.imgsLength;

		if ( tinyCurrent !== undefined ) {
			this.current = tinyCurrent;
		}
	};

	Sliderify.prototype.addNavigationElements = function() {
		for (var i = this.imgsLength - 1; i >= 0; i--) {
			$('<a/>', {
				href: '#',
				text: i + 1,
				"data-slide" : i
			})
			.prependTo("." + this.config.paginationClass)
			.addClass( (i === 0) ? 'active' : '' );
		};
	};

	Sliderify.prototype.highlightCurrent = function() {
		this.paginator
			.find('a[data-slide="' + this.current + '"]')
			.addClass('active')
			.siblings()
			.removeClass('active');
	}

	Sliderify.prototype.addStatus = function() {
		$("<div/>", {
			text: this.config.statusText + this.imgsLength,
			class : this.config.statusClass
		}).appendTo(this.container);

		$("<span/>", {
			text : this.current + 1
		}).prependTo("." + this.config.statusClass);
	};

	Sliderify.prototype.updateStatus = function() {
		if (this.config.showStatus) {
			$("." + this.config.statusClass).find("span").text(this.current + 1);
		};
	};

	$.fn.sliderify = function(options) {
		new Sliderify(this.first(), options);
		return this.first();
	};

})(jQuery, window, document);