// Toggle Billed Anually vs Billed monthly 
//Adds ? if it is no present
function checkQMutms(destination){
  if( destination.indexOf("?") < 0 ){
    return destination + "?";
  }
  return destination;
}

var sndleveldomain = '.copper.com';

$("input[name$='pricingCheckToggle']").click(function () {
  if ( $(this).is(':checked') ) {
	var test = 'annual';
  $(".desc").hide();
  $('span.billed-monthly').hide();
  $(".js-pricing" + test).show();
	} else {
	var test = 'monthly';
  $(".desc").hide();
  $(".js-pricing" + test).show();
  $('span.billed-monthly').css("display", "block");
	}
  
});

$("a.pricing-cta").click(function(event) {
	event.preventDefault();
	// Set Cookie Variables
	var parameters = [
	 'initial_utm_source',
	 'initial_utm_campaign',
	 'initial_utm_medium',
	 'initial_utm_adgroup',
	 'initial_utm_content',
	 'initial_utm_term',
	 'utm_source',
	 'utm_campaign',
	 'utm_medium',
	 'utm_adgroup',
	 'utm_content',
	 'utm_term',
	 'campaignid',
	 'adgroupid',
	 'feeditemid',
	 'targetid',
	 'loc_interest_ms',
	 'loc_physical_ms',
	 'matchtype',
	 'network',
	 'device',
	 'devicemodel',
	 'creative',
	 'keyword',
	 'placement',
	 'target',
	 'adposition',
	 'gclid',
	 'marketing_experiment'
	];
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	var planType = $(this).data('plan-type');
	var monthlyOrAnnual = ( $("input[name$='pricingCheckToggle']").is(':checked') ) ? 'Annual' : 'Monthly';
	var marketing_experiment_value = planType + " - " + monthlyOrAnnual;
	var clickEvents = {
	    'marketing_experiment_name': 'grow164_pricing_page',
	    'marketing_experiment_value': marketing_experiment_value
	}
	Cookies.set('marketing_experiment', 'grow164_pricing_page_' + planType + '_' + monthlyOrAnnual, { domain:  sndleveldomain });
    Cookies.set('utm_term', Cookies.get('marketing_experiment'), { domain:  sndleveldomain });
	var theDestination = $(this).attr('href');
	
	//Construct the URL
	var finalDest = checkQMutms(theDestination) + parameters.filter(function(key) {
	    if (Cookies.get(key)) {
	        return key;
	    }
	}).map(function(key) {
	    return "&" + [key, Cookies.get(key)].map(encodeURIComponent).join("=");
	}).join("");

	// amplitude.getInstance().logEvent('cta_button_click', clickEvents);

	if (finalDest.slice(-1) == "?") {
	    // If no ga trakers and UTMS
	    window.location.href = finalDest.replace("?", "");
	} else {
	    //If no ga trakers 
	    window.location.href = finalDest.replace("?&", "?");
	}
});

function setConstant() {
  return {
    navPosition: $('.nav-added').offset().top + 80,
    heightOfTables: $('.l-pricing-tables--container').height() -200,
    windowWidth: $(window).width()
  }
}

// Make COMPARE FEATURES header sticky when scrolling
  // New Pricing Nav with Flexbox
// if ($('.js-pricing-nav').length > 0) {
//   var constants = setConstant();
//   var navPosition = constants.navPosition, 
//       heightOfTables = constants.heightOfTables,
//       windowWidth = constants.windowWidth,
//       fixedNavHeight = 100,
//       tablePaddingTop = 150;
//   $(window).scroll(function () {
//     // If window has been resized reset constants
//     if(windowWidth !== $(window).width()){
//       constants = setConstant();
//       navPosition = constants.navPosition, 
//       windowWidth = constants.windowWidth;
//     }
//     // Only add classes if the window is bigger than 650px
//     if (window.matchMedia("(min-width: 650px)").matches) {
//       var scrollPosition = $(window).scrollTop() //padding top of element;
//       // To eliminate jittering nothing happens between a small period of scrolling
//       // E.g.  heightOfTables = 870  
//       //       navPosition  = 960
//       //       fixedNavHeight = 100;
//       //       tablePaddingTop = 150;
//       // Nothing happens while 1680 < scrollPosition > 1730
//       if(scrollPosition > heightOfTables + navPosition - fixedNavHeight){
//         $('.js-pricing-nav').removeClass('fixed-nav');
//         $('.nav-added').removeClass('fixed-nav');
//       } else if(scrollPosition < heightOfTables + navPosition - tablePaddingTop ) {
//         $('.js-pricing-nav').toggleClass('fixed-nav', scrollPosition > navPosition - fixedNavHeight);
//         $('.nav-added').toggleClass('fixed-nav', scrollPosition > navPosition - fixedNavHeight);
//       }
//     }
//   });
// }
