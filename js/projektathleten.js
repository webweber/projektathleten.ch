// Wait for the page to load first
window.onload = function() {
	
	
	initializeStage();
	
	activateLinks();

  	animateHeadline($('.cd-headline'));
}

function initializeStage(){
	$(".content").css("display","none");
	displayContent('#cat_services');
	
	activateLinks();
	//$("#cat_aervices .content").css("display","block");
}

function displayContent(id){
	
	
	$(".content").css("display","none");
	$(id+" .content").css("display","block");
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


