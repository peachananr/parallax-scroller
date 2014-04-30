/* ===========================================================
 * jquery.parallax-scroller.js v1.0
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Scroll through lists with a smooth
 * parallax effects 
 *
 * https://github.com/peachananr/parallax-scroller
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    parallaxSpeed: 3,
    tilt: false,
    parallaxOnMobile: true,
    startPosition: "0%",
    retainNativeScroll: true,
  };  
  
  
  $.fn.parallaxScroller = function(options){
    return this.each(function(){
      var settings = $.extend({}, defaults, options),
          el = $(this),
          originY = 0;
      
      // Wrap all list items in a scroller to be used to scroll    
      el.addClass("ps-list").find(" > *").wrapAll("<div class='ps-scroller'></div>")
      
      
      // Define background according to the markup
      el.find(" > .ps-scroller > *").each(function(){
        var el2 = $(this);
        el2.addClass("ps-list-item").css({
          background: "url(" + el2.data("ps-bg") + ") center center no-repeat",
          "background-size": "100% auto",
          "background-position": "50% " + settings.startPosition
        })
        // If tilt is enable, apply here
        if (settings.tilt != false) {
          el2.css({
            "-webkit-transform": "matrix(1," + (settings.tilt * 0.01) + ",0,1,0,0)",
            "-moz-transform": "matrix(1," + (settings.tilt * 0.01) + ",0,1,0,0)",
            "-o-transform": "matrix(1," + (settings.tilt * 0.01) + ",0,1,0,0)",
            "transform": "matrix(1," + (settings.tilt * 0.01) + ",0,1,0,0)"
          })
          
        }
        
      });
      
      if (settings.retainNativeScroll == true) {
        el.addClass("ps-native")
        el = $("body");
        
      }
      
      // Swipe Support

      var debut,
          isTouching = false;
      if (settings.parallaxOnMobile == true) {
        el.on('touchstart', function() {
          if (event.touches.length == 1) {
            debut = event.touches[0].pageY;
            isTouching = true;
          }
        });   

        el.on('touchend', function() {
          isTouching = false;
          debut = null;
        })
      }
      
      
      
      el.find('.ps-list-item').each(function(){
        var el3 = $(this);
        
        // bind on scroll to create parallax effect on the background 
        el.on('touchmove mousewheel DOMMouseScroll', function(e) {
      
          if (settings.retainNativeScroll == true) {
            originY = $(document).scrollTop();
          }
          
          // Parallax startes/stops only when object is on screen
          if (el3.is_on_screen()) {
            
            if (settings.retainNativeScroll == true) {
              var wh = $(document).height();
              var cond = originY < wh - $(window).height()
            } else {
              var wh = el.find(".ps-scroller").height()
              var cond = originY < wh  - el.height()
            }      
            
            if ( cond && originY > 0 ) {
              var backgroundPos = el3.css('backgroundPosition').split(" "),
                  y = originY/(wh - el.height()) * 100,
                  delta = -e.originalEvent.detail || e.originalEvent.wheelDelta;
            
              if (isTouching == true) {
                var actuel = event.touches[0].pageY,
                    delta =  -1 * (debut - actuel);
              }  
            
            
              
              // Scrolling Up   
              if (delta < 0) {
                y = Math.min(Math.max(parseFloat(backgroundPos[1]) + (settings.parallaxSpeed/5), parseFloat(settings.startPosition)), 100);
              } else {
                // Scrolling Down
                y = Math.min(Math.max(parseFloat(backgroundPos[1]) - (settings.parallaxSpeed/5), parseFloat(settings.startPosition)), 100);
              }           
              
              // Set the new Y Coord for background
              var coords = '50% '+ y + '%';
              el3.css({ "background-position": coords });
               
            }
            
             
          }
      
        });
      });
      
      
      
      
      
      // Bind a scrolling event that will let users scroll down the container
      if (settings.retainNativeScroll != true) {
        
        
        el.on('touchmove mousewheel DOMMouseScroll', function(e, delta) {
          var $scrollTop = originY;
          

          delta = delta || -e.originalEvent.detail / 3 || e.originalEvent.wheelDelta / 120;
          
          if (isTouching == true) {
            var actuel = event.touches[0].pageY,
            delta = debut - actuel;
            if (Math.abs(delta) >= 30) {
              $scrollTop = Math.min(el.find(".ps-scroller").height()  - el.height(), Math.max(0, parseInt($scrollTop - (delta/6) * -1)));
              el.find(".ps-scroller").stop().animate({
                  top: -1 * $scrollTop + 'px'
              }, 0, 'linear');
            }
          } else {
            $scrollTop = Math.min(el.find(".ps-scroller").height()  - el.height(), Math.max(0, parseInt($scrollTop - delta * 30)));
            el.find(".ps-scroller").stop().animate({
                top: -1 * $scrollTop + 'px'
            }, 0, 'linear');
          }
          
          
          


          originY = $scrollTop;



          e.stopPropagation();
          return false;
        });
      } 
      
      
      // Function Check if the when the element appears on the screen
      
      $.fn.is_on_screen = function(){
          var win = el;
          var viewport = {
              top : originY
          };
          
          
          viewport.bottom = viewport.top + win.height();
    
          var bounds = this.offset();
          
          if (settings.retainNativeScroll == true) {
            bounds.top = this.offset().top;
            bounds.bottom = this.offset().top + this.outerHeight();
          } else {
            bounds.top = (this.offset().top - el.find(".ps-scroller").offset().top);
            bounds.bottom = (this.offset().top - el.find(".ps-scroller").offset().top + this.outerHeight()) + this.outerHeight();
          }
          
          return (!(viewport.bottom < bounds.top || viewport.top > (bounds.bottom - 100)));
      };
      
      
    });
    
  }
  

}(window.jQuery);