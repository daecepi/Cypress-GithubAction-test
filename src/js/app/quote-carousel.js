/*****************
 * Quote Carousel
 *****************/
 
var $quote_carousel = $('.c-quote-carousel');	

// If there's a carousel on the page...
if( $quote_carousel.length ){
	
	$quote_carousel.find('.c-quote-carousel__group').slick({
		fade: true,
		autoplay: false,
		dots: true,
		infinite: true,
		arrows: false,
		responsive: [
	    {
	      breakpoint: 768,
	      settings: {
		      fade: false,
	        arrows: false,
	        slidesToShow: 1,
	        adaptiveHeight: true
	      }
	    }
	  ]
	});
	
}
