// Wait for the page to ready first
// define global var
// parse 1 time and cache for more usage
var $body;
$(function(){
	// define global var
	// parse 1 time and cache for more usage
	$body = $('body');
	initializeStage();
	$body.on('click', '.naviItem',function(e){
		e.preventDefault();
		displayContent($(e.currentTarget).find('a').attr('name'));
		var href = $(this).find('a').attr('href');
		console.log(href);
		// HISTORY.PUSHSTATE
		history.pushState('', 'New URL: ' + href, href);
		e.preventDefault();
		console.log(href)

	});
});


function initializeStage(){
	$body.find('.content').css('display', 'none');
	displayContent('cat_projects');


}

function activeLink(path){
	$body.
		find('a[name="' + path + '"]').addClass('active')
		.parent().siblings().find('a').removeClass('active');
}

function displayContent(path){
	var $page = $body.find('#'+ path);
	if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
		$body.find('.content').css('display', 'none');
		$page.find('.content').first().css('display', 'block');
		resetAnimate($page.find('.cd-headline'));
		animateHeadline($page.find('.cd-headline'));
	}else{
		$body.find('.subcategory .content').css('display', 'none');
		$page.find('.content').first().css('display', 'block');
	}
	activeLink(path);
}

function resetAnimate($headLine){
	$headLine.find('.cd-words-wrapper').width('auto').find('b')
		.removeClass('is-hidden is-visible')
		.filter(':eq(0)')
		.addClass('is-visible');
}



