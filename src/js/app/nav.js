if (window.location.hostname == "www.copper.com") {
  $('.js-hide-local').hide();
} 

$('.js-footer-expand').click(function(){
  $(this).toggleClass("footer-expand");
});

//Autohide functionality
  var prevScrollpos = window.pageYOffset;
  $(window).scroll(function() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 200 && $(".stickyNav").length > 0) {
      jQuery(".autohide-nav").css({"transform":"translateY(0px)","transition":"all 0.3s"});
    }else if (prevScrollpos > currentScrollPos && $(".stickyNav").length == 0 ) {
      jQuery(".autohide-nav").css({"transform":"translateY(0px)","transition":"all 0.3s"});
    }else {
      jQuery(".autohide-nav").css({"transform":"translateY(-100px)","transition":"all 0.3s"});
    }
    prevScrollpos = currentScrollPos;
  })
  // window.onscroll = function() {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos <= 100 && $(".stickyNav").length > 0) {
  //     jQuery(".autohide-nav").css({"transform":"translateY(0px)","transition":"all 0.3s"});
  //   }else if (prevScrollpos > currentScrollPos && $(".stickyNav").length == 0 ) {
  //     jQuery(".autohide-nav").css({"transform":"translateY(0px)","transition":"all 0.3s"});
  //   }else {
  //     jQuery(".autohide-nav").css({"transform":"translateY(-100px)","transition":"all 0.3s"});
  //   }
  //   prevScrollpos = currentScrollPos;
  // }
  
  if($('.stickyNav').length > 0){

  var distance = $('.stickyNav').offset().top;

  $(window).resize(function(){
    $('.stickyNav').removeClass("stickyNav-fixed");
    distance = $('.stickyNav').offset().top;
    $('.stickyNav').addClass("stickyNav-fixed");
  });

  $(document).ready(function(){
    if ( $(this).scrollTop() >= distance ) {
      $('.stickyNav').addClass("stickyNav-fixed");
    };
    if($(".stickyNav-Current").text() == ""){
      $(".stickyNav-Current").text($('.stickyNav > ul li:first-child a').text());
    }
    $(".stickyNav-arrow").click(function(){
      $(".stickyNav-mobile ul").toggleClass("active");
      $(".stickyNav-mobile ul").slideToggle("slow");
      
    });
    $(".stickyNav-mobile ul li a").click(function(){
      $(".stickyNav-mobile ul").toggleClass("active");
      $(".stickyNav-mobile ul").slideToggle("slow");
    });
    $('.stickyNav a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
          }
        }
      });
    
  });
  $(window).scroll(function() {
    if ( $(this).scrollTop() >= distance ) {
        $('.stickyNav').addClass("stickyNav-fixed");
    } else {
        $('.stickyNav').removeClass("stickyNav-fixed");
    }
  });

  var count = 0;
  $('main section').waypoint(function(direction) {
    if (direction === 'down') {
      if(this.element.id != ""){
        $(".stickyNav a.active").removeClass("active");
        $(".stickyNav a[href = '#"+this.element.id+"']").addClass("active");
        $(".stickyNav-Current").text(this.element.id);
        count = 0;
      };
      if($(".stickyNav-Current").text() == ""){
        $(".stickyNav-Current").text($('.stickyNav > ul li:first-child a').text());
      }
    }
  }, {
    offset: 0
  });

 
  $('main section').waypoint(function(direction) {
    if (direction === 'up') {      
      if(this.element.id != ""){
        $(".stickyNav a.active").removeClass("active");
        $(".stickyNav a[href = '#"+this.element.id+"']").addClass("active");
        $(".stickyNav-Current").text(this.element.id);
        count = 0;
      };
      if(this.element.id == ""){
        if(count == 0){
          // console.log("no id");
          $(".stickyNav-Current").text($(".stickyNav > ul li a.active").parents().prev("li").find("a").text());
          $(".stickyNav a.active").removeClass("active").parents().prev("li").find("a").addClass("active");
          //$(".stickyNav a[href = '#"+this.element.id+"']").addClass("active");
          count = count + 1;
        }
        
        //$(".stickyNav-Current").text(this.element.id);
      };
      if($(".stickyNav-Current").text() == ""){
        $(".stickyNav-Current").text($('.stickyNav > ul li:first-child a').text());
      }
    }
    
  }, {
    offset: "-150px"
  });
}