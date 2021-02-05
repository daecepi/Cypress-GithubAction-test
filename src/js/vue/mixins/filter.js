export const filter = {
	$('p#filter-header').click(function(event) {
		$('.filter-options').toggle();
		$(this).toggleClass('open');
	});
	$('.search-open').click(function(event) {
		$('.filter, .filter-options, .search-open').hide();
		$('.search-bar').show();
		$('p#filter-header').removeClass('open');
		$('.search-bar input').focus();

	});
	$('.search-close').click(function(event) {
		$('.filter, .search-open').show();
		$('.search-bar').hide();
	});
	$('.filter-option').click(function(event) {
		$(this).toggleClass('selected');
	});
}