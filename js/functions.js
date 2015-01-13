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

function displayContent(path, $body){
    var newPath = path || 'projekte';
    var $page = $body.find('#'+ newPath);
    if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
        $body.find('.content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        resetAnimate($page.find('.cd-headline'));
        animateHeadline($page.find('.cd-headline'));
    }else{
        $body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
    }
    if(path)
        activeLink(path, $body);
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