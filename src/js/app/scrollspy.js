$('.scroll-spy-button-wrap .button-image-wrap').click(function(event) {
	/* Act on the event */
	if ( $('.open-scrollspy')[0] ) {
		$('.scroll-spy-button-wrap').removeClass('open-scrollspy');	
	    $('.scroll-spy-button-wrap .button-image-wrap').removeClass('close-icon');
	    $('.scroll-spy-button-wrap').addClass('user-closed');
	} else {
		$('.scroll-spy-button-wrap').addClass('open-scrollspy');	
	    $('.scroll-spy-button-wrap .button-image-wrap').addClass('close-icon');
	    $('.scroll-spy-button-wrap').removeClass('user-closed');		
	}
});

if( $('.scroll-spy-button-wrap') ) {
	setTimeout(function(){
		if ( ($('.button-image-wrap.close-icon')[0]) == undefined && ($('.user-closed')[0] == undefined ) ) {
			$('.scroll-spy-button-wrap').addClass('open-scrollspy');
	 	    $('.scroll-spy-button-wrap .button-image-wrap').addClass('close-icon');
	 	}
	}, 11000);
}
// bring up the popup 
if( $('.show-exit-intent')[0] ) {         
    var btnNo = document.getElementById('noThanks');
    btnNo.onclick = function(event) {
        event.preventDefault();
        $('#scroll-spy-exit-intent').fadeOut('fast');
        // ga('send', 'event', {
        //     eventCategory: 'Blog Newsletter',
        //     eventAction: 'closed exit popup thank you'
        // });
    };
    var modalCloseBtn = document.getElementById('modal-close-link');
    modalCloseBtn.onclick = function(event) {
        event.preventDefault();
        $('#scroll-spy-exit-intent').fadeOut('fast');
        // ga('send', 'event', {
        //     eventCategory: 'Blog Newsletter',
        //     eventAction: 'closed exit popup modal x'
        // });
    };
    // Exit intent listener.
    function addEvent(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }
    };
    // Exit intent trigger
    if ((document.documentElement.clientWidth < 701) && !localStorage.getItem('exitintent_show')) {
        setTimeout(function() {
            document.getElementById('scroll-spy-exit-intent').setAttribute('style', 'display: flex');
            localStorage.setItem('scrollspy_exitintent_show', 'true'); // Set the flag in localStorage
        }, 7000);
    } else {
        addEvent(document, 'mouseout', function(evt) {
            if (evt.toElement === null && evt.relatedTarget === null && !localStorage.getItem('scrollspy_exitintent_show')) {
                $('#scroll-spy-exit-intent').attr('style', 'display: flex');
                localStorage.setItem('scrollspy_exitintent_show', 'true'); // Set the flag in localStorage
            }
        });
    }

}

// if($('.scroll-spy-button-wrap')){
// 	(function() {
// 	  'use strict';
// 	  var 	startingElementPosition = document.querySelector('.c-hero--split').nextElementSibling.offsetTop,
// 	  		finalPleaPosition = document.querySelector('.final-plea').offsetTop;
// 
// 	  window.onscroll = function() {
// 	  	var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
// 
// 	      if ( scrollPosition >= finalPleaPosition - 100 ) {
// 	      	$('.scroll-spy-button-wrap').removeClass('open-scrollspy');
// 	      	$('.scroll-spy-button-wrap .button-image-wrap').removeClass('close-icon');
// 	      } else if ( scrollPosition >= startingElementPosition - 100 && !( document.querySelector('.user-closed') ) ){
// 	      	$('.scroll-spy-button-wrap').addClass('open-scrollspy');
// 	      	$('.scroll-spy-button-wrap .button-image-wrap').addClass('close-icon');
// 	      }	else {
// 	      	$('.scroll-spy-button-wrap').removeClass('open-scrollspy');
// 	      	$('.scroll-spy-button-wrap .button-image-wrap').removeClass('close-icon');	      	
// 	      }   
// 	  };
// 	})();
// 
// }