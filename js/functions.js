function initializeStage($body){
    $body.find('.content').css('display', 'none');
    switchPage($body);
    window.onpopstate = switchPage;
}

function activeLink(path, $body){
    $body.
        find('a[name="' + path + '"]').addClass('active')
        .parent().siblings().find('a').removeClass('active');
}

function changeCoverImages($body){
    var image,
        images = [
        'Badminton_ at the 2012 Summer Olympics.png',
        'Bowling_ at the 2012 Summer Olympics.png',
        'Tug_Of_War_Pictogram_clip_art_hight.png',
        'Weightlifting_ at the 2012 Summer Olympics.png'
    ];

    image = images[Math.floor(Math.random() * images.length)];

    $body.find('#cover').css({
        backgroundImage: 'url("assets/curtain_graphics/'+ image +'")'
    });
}

function displayContent(path, $body){
    var newPath = path || 'projekte';
    var $page = $body.find('#'+ newPath);

    if(!$page.find('.content').first().is(':hidden'))
        return;

    if($page.hasClass('subcategory')){
        $body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        if(path)
            activeLink(path, $body);
    }else{

        changeCoverImages($body);

        $body.find('#cover').animate({
            width: $body.width() - $body.find('.main').offset().left
        }, 500, function(){

            if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
                $body.find('.content').css('display', 'none');
                $page.find('.content').first().css('display', 'block');
                resetAnimate($page.find('.cd-headline'));
                animateHeadline($page.find('.cd-headline'));
            }

            if(path)
                activeLink(path, $body);

            setTimeout(function(){
                $body.find('#cover').animate({
                    width: 5
                }, 500, function(){

                });
            }, 200);

        });

    }
}

function resetAnimate($headLine){
    $headLine.find('.cd-words-wrapper').width('auto').find('b')
        .removeClass('is-hidden is-visible')
        .filter(':eq(0)')
        .addClass('is-visible');
}

function switchPage($body) {
    $body = $body.type ? $('body') : $body;
    var path = location.pathname,
        pathArray = path.split('/');

    if(!pathArray[pathArray.length - 1]){
        //location.pathname = location.pathname += 'projekte';
        displayContent('', $body);
        return;
    }

    if(pathArray.indexOf('projekte') != -1){
        if(pathArray[pathArray.indexOf('projekte') + 1]){
            $body.find('.aktuellHolder').hide();
        }else{
            $body.find('.aktuellHolder').show();
        }
    }

    for (var i = 0; pathArray.length > i; i++) {
        if (pathArray[i]) {
            displayContent(pathArray[i], $body);
        }
    }
}