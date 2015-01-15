// Wait for the page to ready first
$(function(){
	// parse 1 time and cache for more usage
	var $body = $('body');

	// Initialize Website
	var app = new App({
		$body: $body
	});

	// Bind Click on all nav items
	$body.on('click', '.naviItem', function(e){
		e.preventDefault();
		var href = $(this).find('a').attr('href');
		// HISTORY.PUSHSTATE
		history.pushState('', 'New URL: ' + href, href);
		app.switchPage();
	});

});