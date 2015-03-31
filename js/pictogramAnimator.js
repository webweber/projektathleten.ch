var tl, holder, $body, image;


function initPictogramAnimator(app){
    holder = app;
    tl = new TimelineLite();
   $body = $('body');
}



function openCurtain(){

    //holder.changeCoverImages();
    changeCoverImages();

     tl.addLabel('start');

    var picWidth = 290;
    var paddingTop = 50;
    var picto = $("#pictogram");
    var pictoAddOn = $("#pictogramAddOn");
    var winWidth = $(window).width();
    var cover = holder.$body.find('#cover');

    var durCurtainOpen = 0.8;
    tl.to(cover, durCurtainOpen, {width:winWidth, ease:Cubic.easeIn}, 'start');

    tl.addLabel('athleteInStart');
    if(image.name == 'kugelstossen'){
        tl.fromTo(picto, 1.5, {left:''+(winWidth+picWidth)+'px'}, {left:0, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
        tl.fromTo(pictoAddOn, 1.5, {left:''+(winWidth+picWidth)+'px', top:paddingTop+'px'}, {left:0, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
    }else{
        tl.fromTo(picto, 1.5, {left:''+(winWidth+picWidth)+'px'}, {left:-picWidth+'px', ease:Cubic.easeOut}, '-='+durCurtainOpen/3);
    }
    tl.addLabel('athleteInEnd');

    tl.call(showPage);

    var durCurtainClose = 1.5;
     if(image.name == 'kugelstossen'){
        tl.to(picto, durCurtainClose, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd');
        tl.to(pictoAddOn, 0.6, {left:'-'+picWidth+'px', top:'-'+picWidth+'px', ease:Expo.easeOut}, 'athleteInEnd-=0.3');
    }

    tl.addLabel('closeCurtain');
    tl.to(cover, durCurtainClose, {width:"0%", ease:Cubic.easeOut}, 'athleteInEnd');//

   // tl.to($("#pictogram"), 1.5, {left:'-=500px'}, 'closeCurtain-=0.3');

   
    //tl.to($("#pictogram"), 1.5, {left:'-=500px'}, 'closeCurtain-=0.3');

}

function showPage(){
    holder.showPage(holder.$page);
}


function test(){
    console.log('just testing');
  
    var t = $("#test2");
    tl.to(t, 0.9, {left:500, ease:Cubic.easeOut});

}


function getCoverImages(){
    return [
        {name:'curling', addOn:'curlingBall'},
        {name:'hammerwerfen', addOn:'hammer'},
        {name:'huerdenlauf', addOn:'huerde'},
        {name:'kugelstossen', addOn:'kugel'},
        {name:'speerwurf', addOn:'speer'},
        {name:'weightlifting', addOn:'weight'},
        {name:'fackellauf'},
        {name:'skijump'},
        {name:'gymnastik'},
        {name:'eislauf'}
    ];
};

function changeCoverImages(path){
    

    image = getCoverImages()[Math.floor(Math.random() * this.getCoverImages().length)];

// hardcode, no random - for testing
//image = getCoverImages()[3];

    console.log('changeCoverImages '+image.name);

   $('#pictogram img').attr("src", 'assets/images/athletics_icons/selection/' + image.name+'.gif');
   var addOn = image.addOn ? image.addOn : 'spacer'
   $('#pictogramAddOn img').attr("src", 'assets/images/athletics_icons/selection/' + addOn+'.gif');
};

function preLoader(callback){
    var _self = this,
        imageNames = _self.getCoverImages(),
        images = [],
        count = 0,
        loadCheck;
    imageNames.push('intro.png');
    for(var i = 0; imageNames.length > i ; i++){
        images[i] = new Image();
        images[i].src = 'assets/images/athletics_icons/selection/' + imageNames[i]+'.gif';
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