// Constructor Function
var App = function(options){
    console.log('App init');
    var _self = this;
    // copy all options to this Object
    $.extend(this, options);
    //Default Properties
    _self.isFirstTime = true;
    _self.$speedUpFactor = 10; // speed up animations during development.
    // For deployment set value to 1!

    initPictogramAnimator(this);

    preLoader(function(){
        _self.initializeStage();
    });
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


App.prototype.showPage = function($page){
    var pageID = $page.attr('id');

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


    if($page.hasClass('subcategory')){
        this.$body.find('.subcategory .content').css('display', 'none');
        $page.find('.content').first().fadeIn(500, 'easeOutCubic');
    }else{
        openCurtain();

        if(this.isFirstTime){
            this.unveilScene();
            // Display page
            _self.showPage($page);
            this.isFirstTime = false;
        }
    }
};

App.prototype.unveilScene = function(){
    this.$body.find('.main').css('visibility', 'visible');
}

App.prototype.resetAnimate = function($headLine){
    $headLine.find('.cd-words-wrapper').width('auto').find('b')
        .removeClass('is-hidden is-visible')
        .filter(':eq(0)')
        .addClass('is-visible');
};