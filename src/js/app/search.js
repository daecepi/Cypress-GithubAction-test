//Blog search bar
$('#js-blog-search-open').click(function(){
  $('#js-blog-search-close').addClass('active');
  $('#js-blog-search-open').removeClass('active');
  $('input#js-blog-search-input').focus();
});

$('#js-blog-search-close').find('i').click(function(){
  $('#js-blog-search-open').addClass('active');
  $('#js-blog-search-input').val('');
  $('#js-blog-search-close').removeClass('active');
});