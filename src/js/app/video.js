/*****************
 * Video Control
 *****************/
 
var c_video = {

	isElementInViewport: function(a){
		if(!a||1!==a.nodeType)return!1;a=a.getBoundingClientRect();return!!a&&a.bottom>=$(window).height()/2&&0<=a.right&&a.top<=$(window).height()/2&&a.left<=$(window).width()
	},
	isElementFullyVisible: function(el){
		var r, html;
    if ( !el || 1 !== el.nodeType ) { return false; }
    html = document.documentElement;
    r = el.getBoundingClientRect();

    return ( !!r 
      && r.bottom <= $(window).height() 
      && r.right >= 0 
      && r.top >= 0
      && r.left <= $(window).width()
    );
	}

}
 
//Time format converter - 00:00
var $video = $('video');	

// If there's a video on the page...
if($video.length && $video.hasClass('c-carousel-video-home')){
	
	//remove default control when JS loaded
	$video[0].removeAttribute("controls");
	
	// Time update
	$video.on('timeupdate', function() {
		var currentPos = $video[0].currentTime;
		var maxduration = $video[0].duration ;
		var perc = 100 * currentPos / maxduration;
		
		//console.log('total percantage done: '+ perc + '%');
		//console.log( currentPos +' : '+ maxduration );
		
		if(currentPos < 5){
			var anchor = currentPos;
			var length = 5;
			var percent = Math.round(100 * anchor / length);
			
			if(percent > 98){
				percent = 100;
			}
			
			//console.log('updating the first element');
			//console.log(percent +'/100%');
			
			$('.c-carousel__nav li').eq(0).find('.c-carousel__nav-progress').css({
				'width': percent + '%'
			});
			$('.c-carousel__nav li').eq(1).find('.c-carousel__nav-progress').css("width", "0%");
			$('.c-carousel__nav li').eq(2).find('.c-carousel__nav-progress').css("width", "0%");
		}
		else if(currentPos >= 9){
			var anchor = currentPos - 9;
			var length = 13;
			var percent = Math.round(100 * anchor / length);
			
			if(percent > 98){
				percent = 100;
			}
			
			//console.log('updating the last element');
			//console.log(percent +'/100%');
			
			$('.c-carousel__nav li').eq(0).find('.c-carousel__nav-progress').css("width", "100%");
			$('.c-carousel__nav li').eq(1).find('.c-carousel__nav-progress').css("width", "100%");
			$('.c-carousel__nav li').eq(2).find('.c-carousel__nav-progress').css({
				'width': percent + '%'
			});
		}
		else {
			var anchor = currentPos - 5;
			var length = 5;
			var percent = Math.round(100 * anchor / length);
			
			if(percent > 98){
				percent = 100;
			}
					
			//console.log('updating the middle element');
			//console.log(percent +'/100%');
			
			$('.c-carousel__nav li').eq(0).find('.c-carousel__nav-progress').css("width", "100%");
			$('.c-carousel__nav li').eq(1).find('.c-carousel__nav-progress').css({
				'width': percent + '%'
			});
			$('.c-carousel__nav li').eq(2).find('.c-carousel__nav-progress').css("width", "0%");
		}
	});
	
	//video[0].play();
	
	// Event handler for buttons
	$('.c-carousel__nav li').on('click', function(){
		var time = $(this).data('time');
		
		$video[0].currentTime = parseInt(time);
		$video[0].play();
	});
	
	// Event handler for video
	$('video').on('click', function() {
	    $video[0].paused ? $video[0].play() : $video[0].pause();
	});
	
	// Check if our video is in viewport and respond as needed
  $(window).on('scroll', function(){
	  
	  if( $(this).width() > 768 ){
    
	    if( $video.is(':visible') ){
	    
		    $video.each(function(i){
	    	
		    	if ( c_video.isElementInViewport( $video[i] ) || c_video.isElementFullyVisible( $video[i] ) ){
			    	$video[0].play();
		      }
		      else {
		      	$video[0].pause();
		      }
	      
	      });
      
      }
    
    }
    
  });

}