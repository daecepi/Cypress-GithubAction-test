// Parse URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
 'gclid'
];
var page_location = window.location.pathname;
// CHANGE ME BACK
var host = window.location.host;
var sndleveldomain = '.' + host;
if(host == 'copper.com'){
  sndleveldomain = '.copper.com';
}

// var sndleveldomain = '.copper.com';


// Prosperworks
var imagesrcUrl = "https://gif.prosperworks.com/pixel.gif?" + parameters.map(function(key) {
      return [key, getParameterByName(key)].map(encodeURIComponent).join("=");
  }).join("&");



  // Sets first page only once
  if (Cookies.get('utm_first_page', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_first_page', { domain:  sndleveldomain }) == null || Cookies.get('utm_first_page', { domain:  sndleveldomain }) == "") {
    Cookies.set('utm_first_page', page_location, { domain:  sndleveldomain });
    imagesrcUrl = imagesrcUrl + "&utm_first_page="+encodeURIComponent(page_location)+"&utm_last_page="+encodeURIComponent(page_location);
  } else {
    imagesrcUrl = imagesrcUrl + "&utm_last_page="+encodeURIComponent(page_location);
  } 

// TODO REFACTOR INTO FUNCTION
// Set Cookie Variables
var utm_source = getParameterByName('utm_source');
var utm_campaign = getParameterByName('utm_campaign');
var utm_medium = getParameterByName('utm_medium');
var utm_adgroup = getParameterByName('utm_adgroup');
var utm_content = getParameterByName('utm_content');
var utm_term = getParameterByName('utm_term');
var gclid = getParameterByName('gclid');
var campaignid = getParameterByName('campaignid');
var adgroupid = getParameterByName('adgroupid');
var feeditemid = getParameterByName('feeditemid');
var targetid = getParameterByName('targetid');
var loc_interest_ms = getParameterByName('loc_interest_ms');
var loc_physical_ms = getParameterByName('loc_physical_ms');
var matchtype = getParameterByName('matchtype');
var network = getParameterByName('network');
var device = getParameterByName('device');
var devicemodel = getParameterByName('devicemodel');
var creative = getParameterByName('creative');
var keyword = getParameterByName('keyword');
var placement = getParameterByName('placement');
var target = getParameterByName('target');
var adposition = getParameterByName('adposition');
var homepage_signup = getParameterByName('homepage');
var free_trial_signup = getParameterByName('widget');

var page_location = window.location.pathname;
var parts = location.hostname.split('.');
var subdomain = parts.shift();
var upperleveldomain = parts.join('.');
// var sndleveldomain = '.copper.com';


// Track marketing experiments
if (homepage_signup){
  Cookies.set('marketing_experiment', 'widget_exp_feb_treatment', { domain:  sndleveldomain });
  setTimeout(function(){ 
    Munchkin.munchkinFunction('visitWebPage', {
    'url': '/homepageSignupWidget',
    'params': 'marketing_experiment_name=Home+Page+Widget+Experiment&marketing_experiment_value=variation'
    }); 
  }, 4000);
} else if ((location.host + location.pathname) == 'www.copper.com/' ) {
  Cookies.set('marketing_experiment', 'widget_exp_feb_control', { domain:  sndleveldomain });
  setTimeout(function(){ 
    Munchkin.munchkinFunction('visitWebPage', {
    'url': '/homepageOriginal',
    'params': 'marketing_experiment_name=Home+Page+Widget+Experiment&marketing_experiment_value=original'
    }); 
  }, 4000);
} else if (free_trial_signup) {
  Cookies.set('marketing_experiment', 'widget_exp_mar_variant', { domain:  sndleveldomain });

} else if ((location.host + location.pathname) == 'www.copper.com/free-trial'){
  Cookies.set('marketing_experiment', 'widget_exp_mar_control', { domain:  sndleveldomain });

}

//UTM Tracking Cookies
if (utm_adgroup)  {
  if (Cookies.get('utm_adgroup', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_adgroup', { domain:  sndleveldomain }) == null || Cookies.get('utm_adgroup', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_adgroup', utm_adgroup, { domain:  sndleveldomain });
    Cookies.set('utm_adgroup', utm_adgroup, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_adgroup', utm_adgroup, { domain:  sndleveldomain });
  }
}

if (utm_source)  {
  if (Cookies.get('utm_source', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_source', { domain:  sndleveldomain }) == null || Cookies.get('utm_source', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_source', utm_source, { domain:  sndleveldomain });
    Cookies.set('utm_source', utm_source, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_source', utm_source, { domain:  sndleveldomain });
  }  
}
if (utm_term)  {
  if (Cookies.get('utm_term', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_term', { domain:  sndleveldomain }) == null || Cookies.get('utm_term', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_term', utm_term, { domain:  sndleveldomain });
    Cookies.set('utm_term', utm_term, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_term', utm_term, { domain:  sndleveldomain });
  } 
}
if (utm_content)  {
  if (Cookies.get('utm_content', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_content', { domain:  sndleveldomain }) == null || Cookies.get('utm_content', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_content', utm_content, { domain:  sndleveldomain });
    Cookies.set('utm_content', utm_content, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_content', utm_content, { domain:  sndleveldomain });
  }
}
if (utm_medium)  {
  if (Cookies.get('utm_medium', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_medium', { domain:  sndleveldomain }) == null || Cookies.get('utm_medium', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_medium', utm_medium, { domain:  sndleveldomain });
    Cookies.set('utm_medium', utm_medium, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_medium', utm_medium, { domain:  sndleveldomain });
  }
}
if (utm_campaign)  {
  if (Cookies.get('utm_campaign', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_campaign', { domain:  sndleveldomain }) == null || Cookies.get('utm_campaign', { domain:  sndleveldomain }) == "") {
    Cookies.set('initial_utm_campaign', utm_campaign, { domain:  sndleveldomain });
    Cookies.set('utm_campaign', utm_campaign, { domain:  sndleveldomain });
  } else {
    Cookies.set('utm_campaign', utm_campaign, { domain:  sndleveldomain });
  }
}

if (Cookies.get('campaignid', { domain:  sndleveldomain }) == "null" || Cookies.get('campaignid', { domain:  sndleveldomain }) == null || Cookies.get('campaignid', { domain:  sndleveldomain }) == "") {
  Cookies.set('campaignid', campaignid, { domain:  sndleveldomain });
}
if (Cookies.get('adgroupid', { domain:  sndleveldomain }) == "null" || Cookies.get('adgroupid', { domain:  sndleveldomain }) == null || Cookies.get('adgroupid', { domain:  sndleveldomain }) == "") {
  Cookies.set('adgroupid', adgroupid, { domain:  sndleveldomain });
}
if (Cookies.get('feeditemid', { domain:  sndleveldomain }) == "null" || Cookies.get('feeditemid', { domain:  sndleveldomain }) == null || Cookies.get('feeditemid', { domain:  sndleveldomain }) == "") {
  Cookies.set('feeditemid', feeditemid, { domain:  sndleveldomain });
}
if (Cookies.get('targetid', { domain:  sndleveldomain }) == "null" || Cookies.get('targetid', { domain:  sndleveldomain }) == null || Cookies.get('targetid', { domain:  sndleveldomain }) == "") {
  Cookies.set('targetid', targetid, { domain:  sndleveldomain });
}
if (Cookies.get('loc_interest_ms', { domain:  sndleveldomain }) == "null" || Cookies.get('loc_interest_ms', { domain:  sndleveldomain }) == null || Cookies.get('loc_interest_ms', { domain:  sndleveldomain }) == "") {
  Cookies.set('loc_interest_ms', loc_interest_ms, { domain:  sndleveldomain });
}
if (Cookies.get('matchtype', { domain:  sndleveldomain }) == "null" || Cookies.get('matchtype', { domain:  sndleveldomain }) == null || Cookies.get('matchtype', { domain:  sndleveldomain }) == "") {
  Cookies.set('matchtype', matchtype, { domain:  sndleveldomain });
}
if (Cookies.get('network', { domain:  sndleveldomain }) == "null" || Cookies.get('network', { domain:  sndleveldomain }) == null || Cookies.get('network', { domain:  sndleveldomain }) == "") {
  Cookies.set('network', network, { domain:  sndleveldomain });
}
if (Cookies.get('device', { domain:  sndleveldomain }) == "null" || Cookies.get('device', { domain:  sndleveldomain }) == null || Cookies.get('device', { domain:  sndleveldomain }) == "") {
  Cookies.set('device', device, { domain:  sndleveldomain });
}
if (Cookies.get('devicemodel', { domain:  sndleveldomain }) == "null" || Cookies.get('devicemodel', { domain:  sndleveldomain }) == null || Cookies.get('devicemodel', { domain:  sndleveldomain }) == "") {
  Cookies.set('devicemodel', devicemodel, { domain:  sndleveldomain });
}
if (Cookies.get('creative', { domain:  sndleveldomain }) == "null" || Cookies.get('creative', { domain:  sndleveldomain }) == null || Cookies.get('creative', { domain:  sndleveldomain }) == "") {
  Cookies.set('creative', creative, { domain:  sndleveldomain });
}
if (Cookies.get('keyword', { domain:  sndleveldomain }) == "null" || Cookies.get('keyword', { domain:  sndleveldomain }) == null || Cookies.get('keyword', { domain:  sndleveldomain }) == "") {
  Cookies.set('keyword', keyword, { domain:  sndleveldomain });
}
if (Cookies.get('placement', { domain:  sndleveldomain }) == "null" || Cookies.get('placement', { domain:  sndleveldomain }) == null || Cookies.get('placement', { domain:  sndleveldomain }) == "") {
  Cookies.set('placement', placement, { domain:  sndleveldomain });
}
if (Cookies.get('target', { domain:  sndleveldomain }) == "null" || Cookies.get('target', { domain:  sndleveldomain }) == null || Cookies.get('target', { domain:  sndleveldomain }) == "") {
  Cookies.set('target', target, { domain:  sndleveldomain });
}
if (Cookies.get('adposition', { domain:  sndleveldomain }) == "null" || Cookies.get('adposition', { domain:  sndleveldomain }) == null || Cookies.get('adposition', { domain:  sndleveldomain }) == "") {
  Cookies.set('adposition', adposition, { domain:  sndleveldomain });
}
if (Cookies.get('loc_physical_ms', { domain:  sndleveldomain }) == "null" || Cookies.get('loc_physical_ms', { domain:  sndleveldomain }) == null || Cookies.get('loc_physical_ms', { domain:  sndleveldomain }) == "") {
  Cookies.set('loc_physical_ms', loc_physical_ms, { domain:  sndleveldomain });
}
// Sets first page only once
if (Cookies.get('utm_first_page', { domain:  sndleveldomain }) == "null" || Cookies.get('utm_first_page', { domain:  sndleveldomain }) == null || Cookies.get('utm_first_page', { domain:  sndleveldomain }) == "") {
  Cookies.set('utm_first_page', page_location, { domain:  sndleveldomain });
}
if (Cookies.get('gclid', { domain:  sndleveldomain }) == "null" || Cookies.get('gclid', { domain:  sndleveldomain }) == null || Cookies.get('gclid', { domain:  sndleveldomain }) == "") {
  Cookies.set('gclid', gclid, { domain:  sndleveldomain });
} 

// Blog tracking
if ( document.referrer == "https://www.google.com/" ) {
    if ( ( getParameterByName('utm_source') == 'google_adwords') || ( getParameterByName('utm_medium' ) == 'cpc' ) || ( getParameterByName('utm_medium' ) == 'display' ) ) {
    
    } else {
      // Set the utm_source as google
      Cookies.set('utm_medium', 'organic', { domain:  sndleveldomain });
      Cookies.set('utm_source', 'google', { domain:  sndleveldomain });
    }
}


// REMOVED IP STACK COUNTRY CODE
// WAS CAUSING LEAD ROUTING ISSUES
// Removed oReq below

// var oReq = new XMLHttpRequest(); //New request object

// oReq.onload = function() {
//   //This is where you handle what to do with the response.
//   //The actual data is found on this.responseText
//   var obj = JSON.parse(this.responseText);
//   var parts = location.hostname.split('.');
//   var sndleveldomain = parts.slice(-2).join('.');
//   // Cookies.set("pw_country_code", obj.country_code, { domain: '.' + sndleveldomain});
//   // Cookies.set("pw_state", obj.region_code, { domain: '.' + sndleveldomain});
//   // Cookies.set("pw_zip", obj.zip, { domain: '.' + sndleveldomain});
// 
//   // var finalUrl = imagesrcUrl + "&pw_country_code="+encodeURIComponent(obj.country_code)+"&pw_state="+encodeURIComponent(obj.region_code)+"&pw_zip="+encodeURIComponent(obj.zip);
//   var finalUrl = imagesrcUrl;
//   $('footer').append("<img alt='Url image' id='theImg' src='" + finalUrl + "' style='display:none;' /> ");
// 
// };
// oReq.open("get", "/proxy/ip-track.php", true);
// oReq.send();

//Adds ? if it is no present
function checkQMutms(destination){
  if( destination.indexOf("?") < 0 ){
    return destination + "?";
  }
  return destination;
}

$('.sendUTMsToAmplitude').click(function(event) {
  
  event.preventDefault();
  
  /*
  THIS FUNCTION CAN BE RESUMED TO THE REDIRECT AT THE END
  function checkAmpLogEvent(logEvent,finalDest,deviceID,mktoVisitorToken){
    if(logEvent < amplitude.getInstance()._eventId){
      redirectLink(finalDest,deviceID,mktoVisitorToken);
    }else{
      checkAmpLogEvent(logEvent,finalDest,deviceID,mktoVisitorToken);
    }
  };
  */


  function redirectLink(finalDest,mktoVisitorToken){
    if(finalDest.slice(-1) == "?"){
      // If no ga trakers and UTMS
      
      window.location.href = finalDest.replace("?","") + "?" + mktoVisitorToken; // DeviceId part removed: + '?amp_device_id=' + deviceID 
    }else{
      //If no ga trakers 
      window.location.href = finalDest.replace("?&","?")   + mktoVisitorToken; // DeviceId part removed: + '&amp_device_id=' + deviceID
    }
  };

  // var oldApmLogId = amplitude.getInstance()._eventId;
  var theDestination = $(this).attr('href');

  if(Cookies.get('marketing_experiment')){
    Cookies.set('utm_term', Cookies.get('marketing_experiment'), { domain:  sndleveldomain });
  }  
  // if((location.host + location.pathname) == 'www.copper.com/'){
  if((location.host + location.pathname) == 'copper.lndo.site'){
    if ( theDestination.indexOf('app.prosperworks.com') > 0 ) {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_prosperworks'});
    } else {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_copper'});
    }
  }
  // if((location.host + location.pathname) == 'www.copper.com/'){
  if((location.host) == 'www.copper.com'){
    if ( theDestination.indexOf('app.prosperworks.com') > 0 ) {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_prosperworks'});
    } else {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_copper'});
    }
  }
  if((location.host) == 'www.ali-staging.com'){
    if ( theDestination.indexOf('app.ali-staging.com') > 0 ) {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_prosperworks'});
    } else {
      //amplitude.getInstance().logEvent('cta_button_click', {'try_free': 'sent_to_copper'});
    }
  }
  //Construct the URL
  var finalDest = checkQMutms(theDestination) + parameters.filter(function(key) {
    if (Cookies.get(key)) {
      return key;
    }
  }).map(function(key) {
    return "&" + [key, Cookies.get(key)].map(encodeURIComponent).join("=");
  }).join("");

  //var deviceID = amplitude.getInstance().options.deviceId;

  var mktoVisitorToken = ( Cookies.get('_mkto_trk') ) ? "&visitor_token=" + encodeURIComponent(Cookies.get('_mkto_trk')) : "";  
  /*
  JUST AN EVENT LOG TO AMPLITUDE
  if (amplitude) {
    amplitude.getInstance().logEvent('try_free_to_web_app_start');
  }
  */

  /*
  AMP LOG EVENT CHECKER
  checkAmpLogEvent(oldApmLogId,finalDest,deviceID,mktoVisitorToken);
  */
  redirectLink(finalDest,mktoVisitorToken);
});

// Adds the utms to all demos links

$("a[href='/demos']").click(function(event) {
  /* Act on the event */
  event.preventDefault();
  var theDestination = $(this).attr('href');
  //Construct the URL  
  var finalDest = checkQMutms(theDestination) + parameters.filter(function(key) {
    if (Cookies.get(key)) {
      return key;
    }
  }).map(function(key) {
    return "&" + [key, Cookies.get(key)].map(encodeURIComponent).join("=");
  }).join("");

  if(finalDest.slice(-1) == "?"){
    // If no ga trakers and UTMS
    window.location.href = finalDest.replace("?","");
  }else{
    //If no ga trakers 
    window.location.href = finalDest.replace("?&","?");
  }


});


function sendUTMsToAmplitude(object){
  var theDestination = object.getAttribute('href');
  if (imagesrcUrl) {
    window.location.href = theDestination + imagesrcUrl;
  }
}

// //  // Cookie Message For EU Cookie Law
// (function() {

//   /**
//    * Set cookie
//    *
//    * @param string name
//    * @param string value
//    * @param int days
//    * @param string path
//    * @see http://www.quirksmode.org/js/cookies.html
//    */
//   function createCookie(name,value,days,path) {
//       if (days) {
//           var date = new Date();
//           date.setTime(date.getTime()+(days*24*60*60*1000));
//           var expires = "; expires="+date.toGMTString();
//       }
//       else var expires = "";
//       document.cookie = name+"="+value+expires+"; path="+path;
//   }

//   /**
//    * Read cookie
//    * @param string name
//    * @returns {*}
//    * @see http://www.quirksmode.org/js/cookies.html
//    */
//   function readCookie(name) {
//       var nameEQ = name + "=";
//       var ca = document.cookie.split(';');
//       for(var i=0;i < ca.length;i++) {
//           var c = ca[i];
//           while (c.charAt(0)==' ') c = c.substring(1,c.length);
//           if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//       }
//       return null;
//   }

//   var cookieMessage = document.getElementById('cookie-message');
//   if (cookieMessage == null) {
//       return;
//   }
//   var cookie = readCookie('seen-cookie-message');
//   if (cookie != null && cookie == 'yes') {
//       cookieMessage.style.display = 'none';
//   } else {
//       cookieMessage.style.display = 'block';
//   }
  
//   // Set/update cookie
//   var cookieExpiry = cookieMessage.getAttribute('data-cookie-expiry');
//   if (cookieExpiry == null) {
//       cookieExpiry = 30;
//   }
//   var cookiePath = cookieMessage.getAttribute('data-cookie-path');
//   if (cookiePath == null) {
//       cookiePath = "/";
//   }
//   createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath);

// })();

// // Close EU Cookie Law
// $('.js-kill-cookie').click(function(e) {
//   e.preventDefault();
//   $('#cookie-message').css('display','none');
// });

// temp new Design variant
if(page_location == '/' && getParameterByName('huro') == 'orig'){
  Cookies.set('utm_adgroup', ga.getAll()[0].get('clientId'), { domain:  sndleveldomain });
  Cookies.set('utm_term', 'home_original', { domain:  sndleveldomain });
}else{
  Cookies.set('utm_adgroup', ga.getAll()[0].get('clientId'), { domain:  sndleveldomain });
  Cookies.set('utm_term', 'home_newDesign', { domain:  sndleveldomain });
}