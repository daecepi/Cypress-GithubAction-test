//Simple Accordion
$('.js-accordion').find('.js-accordion-toggle').click(function(){
    //Expand or collapse this panel
    $(this).toggleClass('h-open');
    $(this).next().slideToggle('fast');
  });