'use strict';

!function($){

  var Spire = {
    name : 'spire',

    version : '2.0.3',
	
	addFlexVideo : function(){
	  $('#content object, #content iframe').each(function() {
		if (!$(this).hasClass('no-flex')) {
			if (this.src.indexOf("infusionsoft") < 0 && this.src.indexOf("twitter") < 0 && this.src.indexOf("addthis") < 0 && this.src.indexOf("googleads") < 0 && this.src.indexOf("googlesyndication") < 0 && this.src.indexOf("disqus") < 0) {
			  $(this).parent().addClass('flex-video');
			  
			  if (this.src.indexOf("youtube") >= 0) {
			  	$(this).parent().addClass('widescreen');
			  }
			  
			  if (this.src.indexOf("vimeo") >= 0) {
			    $(this).parent().addClass('widescreen');
				$(this).parent().addClass('vimeo');	
			  }
			  
			  if (this.src.indexOf("wistia") >= 0) {
			    $(this).parent().addClass('widescreen');
				$(this).parent().addClass('vimeo');	
			  }
			}	
		}
	  }); 
	},
	
	initParallax : function(){
	  
	  if (!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
	
		$('.parallax').each(function( index ) {
			var bg = $(this).css('background-image');
			if (bg && bg != 'none') {
			  if (!$(this).hasClass('content-section')) {
				$(this).css('background-size','0');
				$(this).css('visibility','hidden');
			  } else {
				$(this).css('background-image','none');
			  }
	  
			  bg = bg.replace('url("','').replace('")','');
			  bg = bg.replace('url(','').replace(')','');
			  
			  var cont = 'body';
			  if($(this).closest('content-section')){
				  cont = $(this).closest('.content-section');
			  }
			  $(this).parallax({imageSrc: bg});
			}
		});
	  }
	  
	},
	  
	initPopup : function(){
	  if ($('.popup').length > 0) {
		// There are popups on this page, so let's create the modal...
		$('#content').append('<div class="small reveal" id="lightbox" data-reveal></div>');
			
		var $modal = $('#lightbox');
		
		$modal.foundation();

		$('.popup img').click(function(e) {
			e.preventDefault();
			$modal.html('<img src="' + $(this).attr('src') + '" style="display:block;margin:0 auto;"><button class="close-button" data-close aria-label="Close modal" type="button"><span aria-hidden="true">×</span></button>').foundation('open');
		});
		
		$('.popup.auto').first().each(function(index,el) { 
		//	e.preventDefault();
			$modal.html('<div>' + $(el).html() +'<button class="close-button" data-close aria-label="Close modal" type="button"><span aria-hidden="true">×</span></button></div>').foundation('open');
		});
	  }
		
	  // Autofocus first input on reveal popups
	  $(document).on('open.zf.reveal', function(event) {
      	$(event.target).find("input").first().focus();
	  });
	  
	},  
	
	initGhosts : function(){
	  jQuery('.section.ghost-bg').each(function(){
		$(this).off('resizeme.zf.trigger').on('resizeme.zf.trigger', function(){Spire.ghostMe(this);});
		Spire.ghostMe(this);
	  });
		
	  $('[data-toggle]').click(function() {
		setTimeout(function(){ $(window).trigger('resize'); }, 200);
	  });
				
	  $(document).off('down.zf.accordion up.zf.accordion toggle.zf.trigger on.zf.toggler off.zf.toggler finished.zf.animate').on('down.zf.accordion up.zf.accordion toggle.zf.trigger on.zf.toggler off.zf.toggler finished.zf.animate', function() {
		  $(window).trigger('resize');
		  //Foundation.Spire.initGhosts();
		  setTimeout(function(){ $(window).trigger('resize'); }, 200);
	  });
	
	},
	
	ghostMe : function(item){
	  var itm = $(item);
	  
	  if (!itm.data('ghost-id')) {
		var id = Foundation.GetYoDigits(6,'ghost');
		itm.data('ghost-id',id);
	  }
	
	  var gi = $('#ghost-'+itm.data('ghost-id'));
	  
	  if (gi.length == 0) {
		var classes = itm.attr('class');
	  
		var gi = $('<div></div>').attr({
		  'id' : 'ghost-'+itm.data('ghost-id'),
		  'class' : 'ghost',
		}).css({
		  'top' : itm.position().top,
		  'height' : itm.outerHeight() + 1,
		  'position' : 'absolute',
		  'left' : 0,
		  'right' : 0,
		  'width' : '100%',
		  'z-index' : -1,
		  'background-color' : itm.css('background-color'),
		  'background-image' : itm.css('background-image')
		});
		
		$(itm).append(gi);
	  
		 itm.css({
		  'background-color' : 'transparent',
		  'background-image' : 'none'
		 });
		 
		if (itm.hasClass('parallax')) {
			gi.addClass('parallax');
			gi.css({'z-index' : -101});
		}
		
		if (itm.data('ghost-classes')) {
			gi.addClass(itm.data('ghost-classes'));
		}
	  }
		
	  gi.css({
		'top' : itm.position().top,
		'height' : itm.outerHeight() + 1,
	  });
	   
	  var classes = [];
	  if (itm.hasClass('bg-cover')) {
		classes.push('bg-cover');
		//itm.removeClass('bg-cover');
		//itm.css({'background-color' : 'transparent','background-image' : ''});
	  }
	  if (itm.hasClass('bg-contain')) {
		classes.push('bg-contain');
		//itm.removeClass('bg-contain');
		//itm.css({'background-color' : 'transparent','background-image' : ''});
	  }
	  if (itm.hasClass('bg-repeat')) {
		classes.push('bg-repeat');
		//itm.removeClass('bg-repeat');
		//itm.css({'background-color' : 'transparent','background-image' : ''});
	  }
	  gi.addClass(classes.join(" "));
	},
	
	initAnimations : function(){
	  $('[data-spire-animate]').each(function(key,el){
		el = jQuery(el);
		var animation = el.data('spire-animate');
		var timer = el.data('spire-animate-time') || null;
		var event = el.data('spire-animate-event') || null;
		if (timer) {
			Spire.timerAnimation(el,timer,animation);
		}
	  });
	},
  	
	timerAnimation :  function(elem,t,animation){

	  if (typeof t  === typeof undefined || t === false){
		t=3000;
	  }

	  if (typeof animation == typeof undefined || animation === false){
		amimation = 'fade-in';
	  }
	  var timer = new Foundation.Timer(elem, {duration: t, infinite: false}, function(){
		if (animation.includes('-in')) {
		  Foundation.Motion.animateIn(elem,animation);
		} else {
		  Foundation.Motion.animateOut(elem,animation);
		}
	   }).start();
	},
	
	smartSticky : function(){
	  $('[data-smart-sticky]').each(function(key,el){
		el = jQuery(el);
		var anchor_to = el.data('smart-anchor');
		var anchor = '';
		switch(anchor_to){
		  case 'row':
			anchor = el.closest('.row');
			break;
		  case 'column':
			anchor = el.closest('.column');
			break;
		  case 'section':
			anchor = el.closest('.section');
			break;
		}
		if(anchor){
		  anchor = jQuery(anchor);
		  var anchor_id = anchor.attr('id');
  
		  if (typeof anchor_id === typeof undefined || anchor_id === false){
			anchor_id = Foundation.GetYoDigits(6,'sticky-anchor');
			anchor.attr('id',anchor_id);
		  }
		  el.attr('data-anchor',anchor_id);
		  el.attr('data-sticky','');
		  
		  new Foundation.Sticky(el);
		} else {
		  el.attr('data-sticky','');
		  el.attr('data-top-anchor',el.position().top);
		  el.attr('data-margin-top','0');

		  new Foundation.Sticky(el);
			
		  if ($(window).scrollTop() < 0) {
		    $(window).trigger('changed.zf.mediaquery');
		  }
		}
	  });
	},
	
	initBgFilters: function() {
		jQuery('[data-bg-filter]').each(function(){
		  console.log(jQuery(this).find('::after'));
		});
	},
	
	initSearchButton: function() {
		jQuery('.search_button').hover(
			function() {
				clearTimeout(this.timer);
				jQuery('#nav_search_box').foundation('open');
			},
			function() {
				if (!(jQuery('#nav_search_box #searchbox').is(':focus') || jQuery('#nav_search_box #searchbox').val() != '')) {
					this.timer = setTimeout(function(){ jQuery('#nav_search_box').foundation('close'); }, 500);
				}
			}
		).click(function() {
			if (jQuery('#nav_search_box').hasClass('is-open')) {
				jQuery('#nav_search_box #searchbox').focus();
				jQuery('#nav_search_box').foundation('close');
			} else {
				jQuery('#nav_search_box').foundation('open');
				jQuery('#nav_search_box #searchbox').focus();
			}
		}).keydown(function(e) {
			if (e.keyCode == 32) {
				jQuery('#nav_search_box #searchbox').focus().val(jQuery('#nav_search_box #searchbox').val() + ' ');
			}
			
			if (e.keyCode == 13) {
				jQuery('#nav_search_box #search-form').submit();
			}
		});
	},
	
	initSizes: function() {
		jQuery('[data-size-height],[data-size-width]').each(function(){
		  Spire.sizeMe(this);
		});
	},
	
	sizeMe: function(item){
	 
	  var size_data = jQuery(item).data('size-height');
	  
	  var rules =  typeof size_data === 'string' ? size_data.match(/\[.*?\]/g) : '';

	  var mtch = false;
	  for (var i in rules) {
		if(rules.hasOwnProperty(i)) {
		  var rule = rules[i].slice(1, -1).split(',');
		  var size = rule.slice(0, -1).join('').trim();
		  var query = rule[rule.length - 1].trim();
  
		  if (Foundation.MediaQuery.is(query)) {
			jQuery(item).css('min-height',size);
			mtch = true;
		  }
		}
	  }
	  
	  if (!mtch) {
		jQuery(item).css('min-height','inherit');
	  }
	  /*
	  if (jQuery(item).data('size-height')) {
		var groups = jQuery(item).data('size-height').split(";");
		for (var x in groups) {
			var size = groups[x].split(":");
			if (size[0] == Foundation.MediaQuery.current) {
				jQuery(item).css('min-height',size[1]);
			} else {
			  jQuery(item).css('min-height','inherit');
			}
		}
	  }
	  if (jQuery(item).data('size-width')) {
		var groups = jQuery(item).data('size-width').split(";");
		for (var x in groups) {
			var size = groups[x].split(":");
			if (size[0] == Foundation.MediaQuery.current) {
				jQuery(item).css('min-width',size[1]);
			}else {
			  jQuery(item).css('min-width','inherit');
			}
		}
	  }
	  */
	},
	
	initImgage: function(){

	  $.each($.find("img[data-src]"),function(i,el){
		  var w = $(el).width();
		  var h = $(el).height();
		  
		  var src = $(el).data('src');
		  var ext = '';
		  var max = 200;
		  var fld = '/';
		  
		  if (w > 10 || h > 10) {
			if (w > h) {
			  max = w;
			} else {
			  max = h;
			}
		  } else {

			switch(Foundation.MediaQuery.current){

			  case 'small':
				max = 300;
				break;
			  case 'medium':
				max = 500;
				break;
			  case 'large':
				max = 900;
				break;
			  case 'xlarge':
				max = 1000;
				break;
			  case 'xxlarge':
				max = 1400;
				break;
			}
		  }
		  
		  
		  if (max <= 150) {
			fld = '/mcrec/';
			ext = '-sp-th';
		  } else if (max <= 300) {
			fld = '/mcrec/';
			ext = '-sp-sm';
		  } else if (max <= 500) {
			fld = '/mcrec/';
			ext = '-sp-med';
		  } else if (max <= 900) {
			fld = '/mcrec/';
			ext = '-sp-lrg';
		  }
		  
		  var path = src.replace(/\.([^.]*)$/,ext+'.$1');
		  el.src = path.replace(/\/([^/]*)$/,fld+'$1');
		  
		});
	}
  };
  
  Foundation.Spire = Spire;
	
  Foundation.Abide.defaults.validators['checkbox_limit'] = function($el, required, parent) {
    var group = parent.closest('.checkbox-group');
    var min = group.attr('data-validator-min');
    var checked = group.find(':checked').length;
    if (checked >= min) {
      // clear label highlight
      group.find('label').each(function() {
        $(this).removeClass('is-invalid-label');
      });
      // clear checkbox error 
      group.find(':checkbox').each(function() {
        $(this).removeClass('is-invalid-input').removeAttr('data-invalid');
      });
      group.find('.form-error').hide();
      return true;
    } else {
      // label highlight
      group.find('label').each(function() {
        $(this).addClass('is-invalid-label');
      });
      // checkbox error 
      group.find(':checkbox').each(function() {
        $(this).addClass('is-invalid-input').attr('data-invalid');
      });
      group.find('.form-error').show();
      return false;
    }
  };	
  
  $(document).ready(function(){
	Foundation.Spire.initImgage();
	Foundation.Spire.initSizes();
	Foundation.Spire.initSearchButton();
	Foundation.Spire.initPopup();
	Foundation.Spire.initAnimations();
	Foundation.Spire.smartSticky();
	Foundation.Spire.initGhosts();
	Foundation.Spire.initParallax();
	
  });
  
  $( window ).on( "load", function() {
	Foundation.Spire.initGhosts();
	Foundation.Spire.initBgFilters();
	$('body').removeClass('loading');
  });

}(jQuery);