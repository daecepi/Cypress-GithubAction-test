// Desktop Nav Toggle
$('.js-dropdown-nav').click(function(){
  var nav = $(this).attr('dropdown-type');
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $("#"+ nav).removeClass('active');
  }
  else {
    $('.js-dropdown-nav').removeClass('active');
    $('.c-nav__dropdown').removeClass('active');
    $(this).addClass('active');
    $("#"+ nav).addClass('active');
    $('#nav-icon2 span').addClass('white');
    $('.c-nav--mobile').addClass('z-index');
  }
});

$('main').click(function() {
  var nav = $('.js-dropdown-nav').attr('dropdown-type');
  if ($('.js-dropdown-nav').hasClass('active')) {
    $('.js-dropdown-nav').removeClass('active');
    $("#"+ nav).removeClass('active');
    $('.c-nav__dropdown').removeClass('active');
  }
});

// Mobile Nav Toggle
$('#nav-icon2').click(function(){
  $(this).toggleClass('open');
  $('body').toggleClass('body--stop-scrolling');
  $('.c-nav--mobile__overlay').toggleClass('open');
  $('#nav-icon2 span').removeClass('white');
  $('.c-nav--mobile').removeClass('z-index');
  $('.c-nav__dropdown').removeClass('active');
  $('.js-dropdown-nav').removeClass('active');
});

$('.close-mobile-nav').click(function(){
  $('#nav-icon2').removeClass('open');
  $('body').toggleClass('body--stop-scrolling');
  $('.c-nav--mobile__overlay').toggleClass('open');
  $('#nav-icon2 span').removeClass('white');
  $('.c-nav--mobile').removeClass('z-index');
  $('.c-nav__dropdown').removeClass('active');
  $('.js-dropdown-nav').removeClass('active');
});

$('.js-sub-back').click(function() {
  $('.c-nav__dropdown').removeClass('active');
  $('#nav-icon2 span').removeClass('white');
  $('.js-dropdown-nav').removeClass('active');
  $('.c-nav--mobile').removeClass('z-index');
});

// Mobile Footer control
$('span.footer__title').click(function(){
  $(this).parent().parent('.footer__links').toggleClass('open');
});
