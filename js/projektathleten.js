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
	displayContent('cat_services');
	displaySubContent('subcategory');
	activateLinks();
}

function displayContent(id){
	var $cat = $body.find('#'+ id);
	if($cat.find('.content').is(':hidden')){
		$body.find('.content').css('display', 'none');
		$cat.find('.content').first().css('display', 'block');
		resetAnimate($cat.find('.cd-headline'));
		animateHeadline($cat.find('.cd-headline'));
	}
}
function activateLinks(){
	$body.on('click','.naviItem',function(e){
		e.preventDefault();
		displayContent($(e.currentTarget).find('a').attr('name'));
		displaySubContent($(e.currentTarget).find('a').attr('name'));
		var targetUrl= $(this).find('a').attr('href');
			targetTitle = $(this).find('a').attr('title');
		$(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
		history.pushState('','targetUrl',targetUrl);
	});
}

function resetAnimate($headLine){
	$headLine.find('.cd-words-wrapper').width('auto').find('b')
		.removeClass('is-hidden is-visible')
		.filter(':eq(0)')
		.addClass('is-visible');
}
function displaySubContent(id){
	var $subCat = $body.find('#'+id);
	if($subCat.is(':hidden')){
		$body.find('.subcategory').css('display','none');
		$subCat.css('display','block');
	}
}


