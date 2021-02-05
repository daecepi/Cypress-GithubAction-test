// always on
var signupEvents = {
	'marketing_experiments': 'home_widget:B'
};

var mktoUTMs = [
 'utm_source',
 'utm_campaign',
 'utm_medium',
 'utm_adgroup',
 'utm_content',
 'utm_term',
 'gclid'
];

if((location.host + location.pathname) == 'www.copper.com/free-trial'){
	signupEvents.marketing_experiments = 'free-trial_widget:B';
} else if ((location.host + location.pathname) == 'www.copper.com/greatness') {
	signupEvents = {
		'marketing_experiment_name': 'GROW-214-greatness',
		'marketing_experiment_value':'original'
	};
}


$('.google_light_btn').click(function(event) {
	event.preventDefault();
	//var checkPrevAmp = amplitude.getInstance()._eventId;

	var destination = $(this).attr('href');
	// var deviceID = amplitude.getInstance().options.deviceId; 
	//Amplitude piece
	signupEvents.signup_flow = 'continue_with_google';
	
	// Go Get UTMs
	  //Construct the URL
	var utmList = mktoUTMs.filter(
		function(key) {
			if (Cookies.get(key)) {
			  return key;
			}
		}).map(function(key) {
			return "&" + [key, Cookies.get(key)].map(encodeURIComponent).join("=");
		}).join("");
	var mktoVisitorToken = ( Cookies.get('_mkto_trk') ) ? "&visitor_token=" + encodeURIComponent(Cookies.get('_mkto_trk')) : "";  


	/*if(amplitude){
		amplitude.getInstance().logEvent('signup_get_started', signupEvents, function(){
			// Google Analytics piece
			ga('send', 'event', 'Free Trial', 'Sign Up', 'Completed');
			// Send the user on
			if( amplitude.getInstance()._eventId > checkPrevAmp ){
				window.location.href = destination + '&amp_device_id=' + deviceID + mktoVisitorToken + utmList;
			}else{
				//WE CAN DO SOMTHING HERE 
			}
		});
	}else{
	}*/
		// Google Analytics piece
		ga('send', 'event', 'Free Trial', 'Sign Up', 'Completed');
		// Send the user on
		window.location.href = destination + mktoVisitorToken + utmList; // DeviceIdpart removeds
	
	// // Google Analytics piece
	// ga('send', 'event', 'Free Trial', 'Sign Up', 'Completed');
	// // Send the user on
	// window.location.href = destination + '&ampDeviceID=' + deviceID;
});

$('#signup_form').submit(function(event) {
	// var checkPrevAmp = amplitude.getInstance()._eventId;
	// var deviceID = amplitude.getInstance().options.deviceId;
	var mktoVisitorToken = ( Cookies.get('_mkto_trk') ) ? Cookies.get('_mkto_trk') : "";  

	// $( '[name="amp_device_id"]' ).val(deviceID);
	$( '[name="visitor_token"]' ).val(mktoVisitorToken);

	mktoUTMs.filter(
		function(key) {
			if (Cookies.get(key)) {
			  return key;
			}
		}).map(function(key) {
			$( '[name="' + key + '"]' ).val(Cookies.get(key));
		}
	);

	signupEvents.signup_flow = 'email';
	/*if(amplitude){
		amplitude.getInstance().logEvent('signup_get_started', signupEvents, function(){
			ga('send', 'event', 'Free Trial', 'Sign Up - Other', 'Completed');
			if( amplitude.getInstance()._eventId > checkPrevAmp ){
			}else{
				event.preventDefault();
			}
		});
	}else{
		
	}*/
	// Since amplitude is no longer active just sent without checking for it
	ga('send', 'event', 'Free Trial', 'Sign Up - Other', 'Completed');
});


// Experiment specific