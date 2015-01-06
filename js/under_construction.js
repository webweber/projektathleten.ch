// Wait for the page to load first
window.onload = function() {
	
	
	initializeStage();
	
	//activateLinks();

	//animateHeadline($('.cd-headline'));

};

function initializeStage(){
	$(".content").css("display","none");
	displayContent('#cat_services');
	
	//activateLinks();
	//$("#cat_aervices .content").css("display","block");
}

function resetAnimate($headLine){
	$headLine.find('.cd-words-wrapper b')
		.removeClass('is-hidden is-visible')
		.filter(':eq(0)')
		.addClass('is-visible');
}

function displayContent(id){
	var $cat = $(id);
	resetAnimate($cat.find('.cd-headline'));
	animateHeadline($cat.find('.cd-headline'));
	$(".content").css("display", "none");
	$cat.find(".content").css("display", "block");
}

function activateLinks(){
	var link_services = document.getElementById("link_services");
	link_services.onclick = function(){
	  displayContent("#cat_services");
	}
	var link_clients = document.getElementById("link_clients");
	link_clients.onclick = function(){
	  displayContent("#cat_clients");
	}
	var link_kontakt = document.getElementById("link_kontakt");
	link_kontakt.onclick = function(){
	  displayContent("#cat_kontakt");
	}
}


