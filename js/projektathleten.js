// define global var
// parse 1 time and cache for more usage
var $body;
// Wait for the page to ready first
$(function(){
	$body = $('body');
	initializeStage();
});

function initializeStage(){
	$body.find('.content').css('display', 'none');
	//displayContent('cat_services');
	displayContent('cat_projects');// for testing
	activateLinks();
}


function displayContent(id){
	var $cat = $body.find('#'+ id);
	if($cat.find('.content').is(':hidden')){
		$body.find('.content').css('display', 'none');
		$cat.find('.content').css('display', 'block');
		resetAnimate($cat.find('.cd-headline'));
		animateHeadline($cat.find('.cd-headline'))
	}
}

function activateLinks(){
	$body.on('click', '.naviItem', function(e){
		displayContent($(e.currentTarget).find('a').attr('name'));
	});
}

function resetAnimate($headLine){
	$headLine.find('.cd-words-wrapper').width('auto').find('b')
		.removeClass('is-hidden is-visible')
		.filter(':eq(0)')
		.addClass('is-visible');
}