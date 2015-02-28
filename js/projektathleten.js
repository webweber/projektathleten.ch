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
		listHeader.siblings().hide();
	}else{
		listHeader.removeClass('active');
		listHeader.siblings().hide();
		$this.addClass('active');
		$this.siblings().show()
	}
	});

	$body.find('.show_bg_image').hover(function(){

		var $window = $(window),
			$img = $(this).find('img'),
			$bigImg = $body.find('#bigImage'),
			RequiredPercent = 75,
			//Height Calculation
			winHeight = $window.height(),
			winHeightInRequiredPercent = (winHeight * RequiredPercent) / 100,
			imageNaturalHeight = $img[0].naturalHeight,
			//Width Calculation
			winWidth = $window.width(),
			winWidthInRequiredPercent = (winWidth * RequiredPercent) / 100,
			imageNaturalWidth = $img[0].naturalWidth;

		$img.css({'zIndex': 2, 'position': 'relative'});
		$bigImg.attr('src', $img.attr('src')).css({'display': 'block'});

		// Set Image Width
		if(winWidthInRequiredPercent < imageNaturalWidth){
			$bigImg.attr('width', winWidthInRequiredPercent)
		}

		// Set Image Height
		if(winHeightInRequiredPercent < imageNaturalHeight){
			$bigImg.attr('height', winHeightInRequiredPercent)
		}

	}, function(){
		var $bigImg = $body.find('#bigImage');
		$bigImg.attr('src', '').css({'display': 'none'});
		$(this).find('img').css({'zIndex': 0, 'position': 'static'});
	});

	$body.find('.show_bg_image img').on('mousemove', function(event){
		var $bigImg = $body.find('#bigImage'),
			$img = $(this),
			imageHeight = $img.height(),
			imageWidth = $img.width(),
			imageOffsetTop = $img.offset().top,
			imageOffsetLeft = $img.offset().left,
			$window = $(window),
			winHeight = $window.height(),
			winWidth = $window.width();


		if(event.pageY > imageOffsetTop && event.pageY < (imageOffsetTop + imageHeight) ){
			var totalLength = (imageOffsetTop + imageHeight) - imageOffsetTop;
			var secondResult = (imageOffsetTop + imageHeight) - event.pageY;
			var selectedLength = totalLength - secondResult;
			var currentPercent = (selectedLength * 100) / totalLength;
			var positionTop = (winHeight / 100) * currentPercent;
		}

		if(event.pageX > imageOffsetLeft && event.pageX < (imageOffsetLeft + imageWidth) ){
			console.log('TOP :', imageOffsetLeft);
			console.log('End :', (imageOffsetLeft + imageWidth));
			console.log(event.pageX)
			console.log(event.pageX)

			var totalLength = (imageOffsetLeft + imageWidth) - imageOffsetLeft;
			var secondResult = (imageOffsetLeft + imageWidth) - event.pageX;
			var selectedLength = totalLength - secondResult;
			var currentPercent = (selectedLength * 100) / totalLength;
			var positionLeft = (winWidth / 100) * currentPercent;
		}

		$bigImg.css({'top': positionTop - ($bigImg.height() / 2), 'left': positionLeft - ($bigImg.width() / 2)});
	})

});