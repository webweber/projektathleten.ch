// Wait for the page to ready first
$(function(){
	// parse 1 time and cache for more usage
	var $body = $('body');

	// Initialize Website
	initializeStage($body);

	// Bind Click on all nav items
	$body.on('click', '.naviItem', function(e){
		e.preventDefault();
		var href = $(this).find('a').attr('href');
		// HISTORY.PUSHSTATE
		history.pushState('', 'New URL: ' + href, href);
		switchPage($body);
	});

});