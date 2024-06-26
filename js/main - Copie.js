'use strict';

/* 0. Initialization */
// Get height on Window resized
$(window).on('resize',function(){
    var slideHeight = $('.slick-track').innerHeight();
	return false;
});


// Show / hide menu
var menuItems = $('.header-top');
$('.menu-icon').on('click', function () {
	if (menuItems.hasClass('menu-visible')) {
		menuItems.removeClass('menu-visible');
	} else {
		menuItems.addClass('menu-visible');
	}
});
// Smooth scroll <a> links 
var $root = $('html, body');
$('a.s-scroll').on('click',function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});


// Scroll t onext/previou section
$('.p-footer a.down').on('click', function () {
	$.fn.fullpage.moveSectionDown();
});
$('.p-footer a.up').on('click', function () {
	$.fn.fullpage.moveSectionUp();
});

/* 1. Clock attribute */




/* 2. Background for page / section */

var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-image-src');
	list[i].style.backgroundImage = "url('" + src + "')";
	list[i].style.backgroundRepeat = "no-repeat";
	list[i].style.backgroundPosition = "center";
	list[i].style.backgroundSize = "cover";
}

/* Background color as data attribut */
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-bgcolor');
	list[i].style.backgroundColor = src;
}

/* Background slide show Background variables  */
var imageList = $('.slide-show .img');
var imageSlides = [];
for (var i = 0; i < imageList.length; i++) {
	var src = imageList[i].getAttribute('data-src');
	imageSlides.push({src: src});
}


/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var sectionElem = $('.section');

/* 3. Init all plugin on load */
$(document).ready(function() {
	/* Init console to avoid error */
	var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
	
	/* Init Slidesow background */
	 $('.slide-show').vegas({
        delay: 5000,
        shuffle: true,
        slides: imageSlides,
    	//transition: [ 'zoomOut', 'burn' ],
		animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
	
	/* Init video background */
	$('.video-container video, .video-container object').maximage('maxcover');
	
	/* Init youtube video background */
	if(backgroundVideoUrl != 'none'){
        
        //disable video background for smallscreen
        if($(window).width() > 640){
          $.okvideo({ source: backgroundVideoUrl,
                    adproof: true
                    });
        }
    }
	var pageSectionDivs = $('.fullpg .section');
	var pageSections = [];
	var pageAnchors = [];
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function(pageSection , cb){
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function(err){
		
		/** Init fullpage.js */
		$('#mainpage').fullpage({
			menu: '#qmenu',
	//		anchors: ['home',  'register', 'about-us', 'contact', 'message'],
			anchors: pageAnchors,
			verticalCentered: true,
			responsive: 481,
			scrollOverflow: true,
			css3: false,
			navigation: true,
			onLeave: function(index, nextIndex, direction){
				arrowElem.addClass('gone');
				sectionElem.addClass('transition');
	//			$('.active').removeClass('transition');
				slideElem.removeClass('transition');
				isSlide = false;
			},
			afterLoad: function(anchorLink, index){
				arrowElem.removeClass('gone');
				sectionElem.removeClass('transition');
				if(isSlide){
					slideElem.removeClass('transition');
				}
			},

			afterRender: function(){}
		});
		$('#fp-nav').css("margin-top",0);
	});

	
});


// Page Loader : hide loader when all are loaded
$(window).load(function(){
    $('#page-loader').addClass('hidden');
    $('.section').addClass('anim');
});

// Email validation text, uncomment below to use them
/*
// Email registration 
var email_reg_elem = document.getElementById("reg-email");
email_reg_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
email_reg_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
// email message
var email_message_elem = document.getElementById("mes-email");
email_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
// name message
email_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var name_message_elem = document.getElementById("mes-name");
name_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This name field cannot be left blank");
	}
};
// text message
name_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
var text_message_elem = document.getElementById("mes-text");
text_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This text field cannot be left blank");
	}
};
text_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
*/