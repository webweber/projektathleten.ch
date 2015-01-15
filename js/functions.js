// Constructor Function
var App = function(options){
    // copy all options to this Object
    $.extend(this, options);
    //Default Properties
    this.isFirstTime = true;
    this.initializeStage();
};

App.prototype.initializeStage = function(){
    this.$body.find('.content').css('display', 'none');
    this.switchPage();
    $(window).on('popstate', {ref: this}, this.switchPage);
};

App.prototype.switchPage = function(e){

    var _self = e ? e.data.ref : this,
        path = location.pathname,
        pathArray = path.split('/');

    if(!pathArray[pathArray.length - 1]){
        _self.displayContent('', _self.$body);
        return;
    }

    if(pathArray.indexOf('projekte') != -1){
        if(pathArray[pathArray.indexOf('projekte') + 1]){
            _self.$body.find('.aktuellHolder').hide();
        }else{
            _self.$body.find('.aktuellHolder').show();
        }
    }

    for (var i = 0; pathArray.length > i; i++) {
        if (pathArray[i]) {
            _self.displayContent(pathArray[i], this.$body);
        }
    }
};

App.prototype.activeLink = function(path){
    this.$body.
        find('a[name="' + path + '"]').addClass('active')
        .parent().siblings().find('a').removeClass('active');
};

App.prototype.changeCoverImages = function(path){
    var image,
        images = [
            'Badminton_ at the 2012 Summer Olympics.png',
            'Bowling_ at the 2012 Summer Olympics.png',
            'Tug_Of_War_Pictogram_clip_art_hight.png',
            'Weightlifting_ at the 2012 Summer Olympics.png'
        ];

    image = images[Math.floor(Math.random() * images.length)];

    this.$body.find('#cover').css({
        backgroundImage: 'url("assets/curtain_graphics/'+ image +'")'
    });
};

App.prototype.showPage = function($page){
    if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
        this.$body.find('.content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        this.resetAnimate($page.find('.cd-headline'));
        animateHeadline($page.find('.cd-headline'));
    }
};

App.prototype.displayContent = function(path){
    var _self = this,
        coverWidth = this.$body.width() - this.$body.find('.main').offset().left,
        newPath = path || 'projekte',
        $page = this.$body.find('#'+ newPath);

    // don't animate if we already on same page
    if(!$page.find('.content').first().is(':hidden'))
        return;

    // Show intro if it is first time
    if(this.isFirstTime){
        _self.$body.find('#coverLoad').width(coverWidth);
        // Display page
        _self.showPage($page);
        // Animate Intro to right
        setTimeout(function(){
            _self.$body.find('#coverLoad').animate({
                width: 10
            }, 500,'easeInCubic')
        }, 1000);
        this.isFirstTime = false;
        return;
    }

    if($page.hasClass('subcategory')){
        this.$body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        if(path)
            this.activeLink(path);
    }else{

        this.changeCoverImages();

        this.$body.find('#cover')
            .animate({
                width: coverWidth
            }, 500, 'easeOutCubic',  function(){
                // Show requested page
                _self.showPage($page);

                if(path)
                    _self.activeLink(path);

                setTimeout(function(){
                    _self.$body.find('#cover').animate({
                        width: 10
                    }, 500,'easeInCubic')

                }, 200)
            })
    }
};

App.prototype.resetAnimate = function($headLine){
    $headLine.find('.cd-words-wrapper').width('auto').find('b')
        .removeClass('is-hidden is-visible')
        .filter(':eq(0)')
        .addClass('is-visible');
};