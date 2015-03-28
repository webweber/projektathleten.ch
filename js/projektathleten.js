// Wait for the page to be ready first
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

	// Swipe images
	var isReversed = false,
		time = 500;

	$body.on('click', '.swipe_toggle', function(){
		if($(this).hasClass('borderLeft')){

			$body.find('.swipe_toggle:eq(0)').animate({
				transform: isReversed ? 'translateX(0)' : 'translateX(215px)'
			}, time, function(){
				$(this)[isReversed ? 'removeClass' : 'addClass']('swipe_index');
			});

			$body.find('.swipe_toggle:eq(1)').animate({
				transform: isReversed ? 'translateX(0)' : 'translateX(-215px)'
			}, time, function(){
				$(this)[isReversed ? 'addClass' : 'removeClass']('swipe_index');
				setTimeout(function(){
					isReversed = !isReversed;
				}, 20);
			});

			setTimeout(function(){
				$body.find('.swipe_toggle:eq(1)')[isReversed ? 'addClass' : 'removeClass']('borderLeft');
				$body.find('.swipe_toggle:eq(0)')[isReversed ? 'removeClass' : 'addClass']('borderLeft');
			}, time/2);
		}
	});

	// Hide all items except self
	$body.find('.listitem').prepend('<img src="assets/images/arrow_outline.png" alt="" class="arrow_icon"/>');

	$body.find('.listHeader').siblings().hide();
	$body.on('click', '.listHeader', function(){
		var listHeader = $('.listHeader');
		var $this = $(this);
	if($this.hasClass('active')){
		$this.removeClass('active');
		listHeader.siblings().slideUp();
	}else{
		listHeader.removeClass('active');
		listHeader.siblings().slideUp();
		$this.addClass('active');
		$this.siblings().slideDown()
	}
	});


	/**************************Start hover Images**********************************/

	var delay = true;
    $body.find('.show_bg_image').hover(function(){
		delay = false;
			var $bigImg = $body.find('#bigImage');
			var $img = $(this).find('img');
			$bigImg.attr('src', $img.attr('src'));
			$body.find('.show_bg_image img').on('mousemove',function(event){
				console.log($(this));

				//$bigImg.css({'right': event.clientX ,'top' : event.clientY-350});
				$bigImg.css({'right': '5%' ,'top' : event.clientY - 300});
			});
    },function(){
		delay= true;
		var $bigImg = $body.find('#bigImage');
		var $img = $(this).find('img');
		setTimeout(function(){
			if(delay) {
				$bigImg.attr('src', '');
			}
			delay = true;
		},250);
    });

	/**************************End hover Images**********************************/

});