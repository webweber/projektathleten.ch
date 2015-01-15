// Constructor Function
var App = function(options){
    // copy all options to this Object
    $.extend(this, options);
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
        //location.pathname = location.pathname += 'projekte';
        displayContent('', _self.$body);
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

App.prototype.displayContent = function(path){
    var _self = this,
        newPath = path || 'projekte';
    var $page = this.$body.find('#'+ newPath);

    if(!$page.find('.content').first().is(':hidden'))
        return;

    if($page.hasClass('subcategory')){
        this.$body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        if(path)
            this.activeLink(path);
    }else{

        this.changeCoverImages();

        this.$body.find('#cover')
            .animate({
                width: this.$body.width() - this.$body.find('.main').offset().left
            }, 500, 'easeOutCubic',  function(){
                if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
                    _self.$body.find('.content').css('display', 'none');
                    $page.find('.content').first().css('display', 'block');
                    _self.resetAnimate($page.find('.cd-headline'));
                    animateHeadline($page.find('.cd-headline'));
                }
                //
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