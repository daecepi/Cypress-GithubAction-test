
/**
 * var homeAnimation | Turn on or off the homepage animation 
 *  values  true  = on
 *          false = off
 */
 
var homeAnimation = false;

function increaseLogoProgress(amt) {
  amt = (amt < 0) ? 0 : (amt > 1) ? 1 : amt;
  $("#logo-gradient--stop1").attr("offset", amt);
  $("#logo-gradient--stop2").attr("offset", (amt + 0.15));
}

function initAnimation() {
  increaseLogoProgress(val);
  val += 0.2;
  if (val <= 1) {
    setTimeout(initAnimation, 30);
  } else {
    restOfHomepageAnimation();
  }
}

function restOfHomepageAnimation() {
  $('.c-eggplant-overlay__block-color').addClass('lift-off');
  $('.c-hero--split').addClass('to-the-left');
  $('#loading-logo').addClass('slide-up');
  setTimeout(function () {
    $("#logo-gradient--rect").attr("fill", "rgba(255, 255, 255, 0)");
    $(".c-eggplant-overlay__nav").addClass("animation--finished");
    $(".c-banner--formally-prosperworks").css('display', 'block');
    $("body").removeClass("body--stop-scrolling")
  }, 1300);
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

var isMobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true;
 }

if (location.pathname === '/' && !getCookie('animation') && !isMobile && homeAnimation == true ) {
  // uncomment to test animation without deleting cookie
  // if (location.pathname === '/'){
  // To show "logo loading" effect 
  // We step up from 0 to 1 using timeouts
  $(".c-banner--formally-prosperworks").css('display', 'none');
  $("body").css('display', 'block');
  $("body").addClass("body--stop-scrolling")
  var val = 0;
  $(window).load(function() {
    initAnimation(val);
    setCookie('animation', true, 1)
  })
} else {
  $(".c-eggplant-overlay__block-color").css("display", "none");
  $("body.home").css('display', 'block');
  $('.c-hero--split').addClass('no-transition');
  $(".c-eggplant-overlay__nav").addClass("animation--finished");
}

// if($(".webBanner").attr("data-webbanneractive") == "1"){

//   $(".home").addClass("webBanner-active");

//   $(".close-web-ad").click(function(){
//     $(".home").removeClass("webBanner-active");
//     $(".webBanner").slideUp()
//   })
// }else{
//   $(".webBanner").remove();
// }

//   if($(".webBanner-active")){

//     var bannerHeight = ($('.webBanner-mobile-cta').is(':visible')) ? $('.webBanner-mobile-cta').height() : ($('#webBannerDoc').is(':visible')) ? $(".webBanner").height() : false;
//     console.log(bannerHeight);
//     $(window).resize(function(){
  
//       bannerHeight = ($('.webBanner-mobile-cta').is(':visible')) ? $('.webBanner-mobile-cta').height() : ($('#webBannerDoc').is(':visible')) ? $(".webBanner").height() : false;
//       if(bannerHeight) {
//         $(".webBanner-active").css({"padding-top": bannerHeight+20 ,"transition":"0.25s","margin-top":"0px"});
//         $(".c-nav--mobile.webBanner-active__nav").css({"top": bannerHeight+20+"px" , "transition":"0.25s"});
//         $(".c-nav--mobile__links").css({"padding-top": bannerHeight+80 , "transition":"0.25s"});
//       } else {
//         $(".webBanner-active").css({"margin-top":"0px", "padding-top":"0px"});
//       }
  
//     });
    
//       if(bannerHeight) {
//         $(".webBanner-active").css({"padding-top": bannerHeight+20 ,"transition":"0.25s","margin-top":"0px"});
//         $(".c-nav--mobile.webBanner-active__nav").css({"top": bannerHeight+20+"px" , "transition":"0.25s"});
//         $(".c-nav--mobile__links").css({"padding-top": bannerHeight+80 , "transition":"0.25s"});
//         console.log("here it comes");
//       } else {
//         $(".webBanner-active").css({"margin-top":"0px", "padding-top":"0px"});
//       }
    
//     }


