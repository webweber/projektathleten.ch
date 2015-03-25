$speedUpFactor = 1;// speed up animations during development. 
                    // For deployment set value to 1!

// Constructor Function
var App = function(options){
    var _self = this;
    // copy all options to this Object
    $.extend(this, options);
    //Default Properties
    _self.isFirstTime = true;
    _self.preLoader(function(){
        _self.initializeStage();
    });
};

App.prototype.initializeStage = function(){
    this.$body.find('.content').css('display', 'none');
    this.switchPage();
    $(window).on('popstate', {ref: this}, this.switchPage);
    initPictogramAnimator(this);
};

App.prototype.switchPage = function(e){



    var _self = e ? e.data.ref : this,
        path = location.pathname,
        pathArray = path.split('/');
 console.log('switchPage '+path);
   // console.log('swîtchPage '+pathArray);

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

App.prototype.getCoverImages = function(){
    return [
        'Badminton_ at the 2012 Summer Olympics.png',
        'Bowling_ at the 2012 Summer Olympics.png',
        'Tug_Of_War_Pictogram_clip_art_hight.png',
        'Weightlifting_ at the 2012 Summer Olympics.png'
    ];
};

App.prototype.changeCoverImages = function(path){
    var image;

    image = this.getCoverImages()[Math.floor(Math.random() * this.getCoverImages().length)];

    this.$body.find('#cover').css({
        backgroundImage: 'url("assets/curtain_graphics/'+ image +'")'
    });
};

App.prototype.preLoader = function(callback){
    var _self = this,
        imageNames = _self.getCoverImages(),
        images = [],
        count = 0,
        loadCheck;
    imageNames.push('intro.png');
    for(var i = 0; imageNames.length > i ; i++){
        images[i] = new Image();
        images[i].src = 'assets/curtain_graphics/' + imageNames[i];
        images[i].onload = function(){
            count ++
        }
    }
    loadCheck = setInterval(function(){
        if(count == imageNames.length){
            callback();
            clearInterval(loadCheck);
        }
    }, 100);
};

App.prototype.showPage = function($page){
   
    var pageID = $page.attr('id');

console.log('showPage '+pageID)
    if(pageID == 'english'){
        $('#navi_main').hide();
    }else{
         $('#navi_main').show();
    }

     var _self =  App.prototype;

    if($page.filter(':not(.subcategory)').find('.content').is(':hidden')){
        this.$body.find('.content').css('display', 'none');
        $page.find('.content').first().css('display', 'block');
        this.resetSubCategory($page);
        this.resetAnimate($page.find('.cd-headline'));
        animateHeadline($page.find('.cd-headline'));
    }
};

App.prototype.resetSubCategory = function($page){
    //Remove active class form subcategories link when active main cat
    $page.find('.content .navi_sub a').removeClass('active');
    $page.find('.content .subcategories .content').hide();
};

App.prototype.displayContent = function(path){

    console.log('displayContent '+path)

    var _self = this,
        coverWidth = this.$body.width() - (this.$body.find('.main').offset().left - 15),
        newPath = path || 'projekte',
        $page = this.$body.find('#'+ newPath);

    // make vars available for pictogramAnimator
    this.coverWidth = coverWidth;
    this.$page = $page;

    if(path)
        this.activeLink(path);

    // don't animate if we already on same page
    if(!$page.find('.content').first().is(':hidden')){
        this.resetSubCategory($page);
        return;
    }

    // Show intro if it is first time
    if(this.isFirstTime){
        _self.$body.find('#coverLoad').width(coverWidth);
        _self.$body.find('.main').css('visibility', 'visible');
        // Display page
        _self.showPage($page);
        // Animate Intro to right
        setTimeout(function(){
            _self.$body.find('#coverLoad').animate({
                width: 0
            }, 500/$speedUpFactor,'easeInCubic')
        }, 1000/ $speedUpFactor);
        this.isFirstTime = false;
        return;
    }

    if($page.hasClass('subcategory')){
        this.$body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().fadeIn(500, 'easeOutCubic');
        //$page.find('.content').first().css('display', 'block');
    }else{

        openCurtain();
/*        
        this.changeCoverImages();

        this.$body.find('#cover')
            .animate({
                width: coverWidth
            }, 500/$speedUpFactor, 'easeOutCubic',  function(){
                // Show requested page
                _self.showPage($page);
                setTimeout(function(){
                    _self.$body.find('#cover').animate({
                        width: 5
                    }, 500/$speedUpFactor,'easeInCubic')

                }, 200/$speedUpFactor)
            })
*/
    }
};

App.prototype.resetAnimate = function($headLine){
    $headLine.find('.cd-words-wrapper').width('auto').find('b')
        .removeClass('is-hidden is-visible')
        .filter(':eq(0)')
        .addClass('is-visible');
};

