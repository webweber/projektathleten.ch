var tl, holder, $body, image, logo, pictograms, pictoCount;


function initPictogramAnimator(app){
    holder = app;
    tl = new TimelineLite();
    $body = $('body');
    logo =  {name:'logo_links', addOn:'logo_rechts', addOn2:'logo_firmenname', addOn3:'logo_namen'};

    pictograms =  [

        {name:'football', addOn:'football_ball'},
         {name:'kugelstossen', addOn:'kugel', sound:'corkPop', soundStart:''},
          {name:'gymnastik_horizontal', addOn:'gymnastik', sound:'click', soundStart:''},
        {name:'speerwurf', addOn:'speer', sound:'arrowImpact', soundStart:''},
        {name:'weightlifting_before', addOn:'weightlifting_after', sound:'click', soundStart:''},
       {name:'gymnastik_reif', sound:'ballHitsGround', soundStart:''},
       
        
        {name:'riding', addOn:'polo', sound:'wiehern', soundStart:''},
         {name:'volleyball', addOn:'volleyball_ball'},
        {name:'fackellauf', sound:'turnOnGas', soundStart:'init'},
         {name:'eislauf', sound:'skating', soundStart:'init'},
        {name:'hammerwerfen', addOn:'hammer', sound:'rotor', soundStart:'init'},

        {name:'curling', addOn:'curlingBall', sound:'curling', soundStart:''},
       
        
        
        {name:'skijump', addOn:'skijump_ski', sound:'goingUp', soundStart:''}
       

        
        //{name:'huerdenlauf', addOn:'huerde'},
       
        
       

       
    ];

  //  pictograms = shuffle(pictograms);
    pictoCount = 0;
}

function openCurtain(){

    changePictograms();

    var picWidth = 290;
    var paddingTop = 50;
    var picto = $("#pictogram");
    var pictoAddOn = $("#pictogramAddOn");
    var pictoAddOn2 = $("#pictogramAddOn2");
    var pictoAddOn3 = $("#pictogramAddOn3");

    var winWidth = $(window).width();
    var cover = holder.$body.find('#cover');

    var durCurtainOpen = holder.isFirstTime ? 0.5 : 0.8;

    tl.addLabel('start');
    
    if(image.soundStart == 'init'){
         playSound(image.sound);
    }
   

    //reset
    showPictoAndAddOn();  
    tl.to(picto, 0, {rotation:0, top:paddingTop, scaleX:1});
    tl.to(pictoAddOn, 0, {rotation:0, top:paddingTop, scaleX:1});

    if(image.name == 'logo_links'){
         tl.call(playSound);
    }

    tl.to(cover, durCurtainOpen, {width:winWidth, ease:Cubic.easeInOut}, 'start');

    tl.addLabel('athleteInStart');
    tl.call(makePictosVisible);

    if(image.name == 'logo_links'){
        tl.call(unveilScene);
        var leftMargin =  ($(window).width() * 0.15)-74;
        tl.fromTo(picto, 1.5/holder.$speedUpFactor, {left:''+(winWidth + 100  )+'px'}, {left:leftMargin+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);
        tl.fromTo(pictoAddOn, 1.5/holder.$speedUpFactor, {left:''+(winWidth + 300)+'px'}, {left:(leftMargin)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);
        tl.fromTo(pictoAddOn2, 1.5/holder.$speedUpFactor, {left:''+(winWidth + 500)+'px'}, {left:(leftMargin)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);
        tl.fromTo(pictoAddOn3, 1.5/holder.$speedUpFactor, {left:''+(winWidth + 700)+'px'}, {left:(leftMargin)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);

    }else if(image.name == 'football'){
        var meetingPoint = 300;//($(window).width() * 0.15)
        tl.fromTo(picto, 1, {left:''+(winWidth)+'px'}, {left:meetingPoint+'px', ease:Cubic.easeIn}, 'athleteInStart-='+0.3);
        tl.fromTo(pictoAddOn, 0.7, {left:''+(-picWidth)+'px'}, {left:meetingPoint+'px', top:paddingTop, ease:Expo.easeIn}, 'athleteInStart+='+0);
        tl.call(playSound);
    }else if(image.name == 'volleyball'){
        var meetingPoint = 150;//($(window).width() * 0.15)
        tl.fromTo(picto, 1.0, {left:''+(winWidth)+'px'}, {left:meetingPoint+'px', ease:Expo.easeOut}, 'athleteInStart-='+0);
        tl.fromTo(pictoAddOn, 0.5, {left:''+(-100)+'px', top:-200}, {left:meetingPoint+'px', top:paddingTop, ease:Expo.easeIn}, 'athleteInStart+='+0.5);
        tl.call(playSound);
    }else if(image.name == 'curling'){

        tl.fromTo(picto, 2.5, {left:''+(winWidth)+'px'}, {left:-picWidth+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);
        tl.fromTo(pictoAddOn, 2.5, {left:''+(winWidth)+'px'}, {left:-(picWidth+200)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+0);
        tl.call(playSound, [image.sound]);
    }else if(image.name == 'kugelstossen'){
       
        tl.fromTo(picto, 1.2, {left:''+(winWidth+picWidth)+'px'}, {left:0, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
        tl.fromTo(pictoAddOn, 1.2, {left:''+(winWidth+picWidth)+'px', top:paddingTop+'px'}, {left:0, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);

    }else if(image.name == 'gymnastik_reif'){
        tl.fromTo(picto, 2.5, {left:''+(winWidth)+'px'}, {left:0, ease:Cubic.easeIn, rotation:'-='+720, transformOrigin:"145px 155px"}, 'athleteInStart-='+durCurtainOpen);
        tl.call(playSound, [image.sound]);
    }else if(image.name == 'skijump'){
        tl.call(playSound, [image.sound]);
        tl.fromTo(picto, 1.5, {top:150, left:''+(winWidth+picWidth)+'px'}, {top:-50, rotation:0, left:-picWidth+'px', ease:Cubic.easeIn}, 'athleteInStart-='+durCurtainOpen);
        tl.fromTo(pictoAddOn, 1.5, {top:150,left:''+(winWidth+picWidth+100)+'px'}, {top:-50, rotation:0, left:-(picWidth+50)+'px', ease:Cubic.easeIn}, 'athleteInStart-='+durCurtainOpen);
    }else if(image.name == 'riding'){
        tl.call(playSound, [image.sound]);
        tl.fromTo(picto, 2.5, {left:''+(winWidth+picWidth)+'px'}, {left:-picWidth+'px', ease:Linear.easeIn}, 'athleteInStart-='+durCurtainOpen);//
        tl.fromTo(pictoAddOn, 2.4, { left:''+(winWidth+picWidth+0)+'px'}, { left:-(picWidth+300)+'px', ease:Cubic.easeIn}, 'athleteInStart-='+durCurtainOpen);
    }else if(image.name == 'speerwurf'){
        tl.fromTo(picto,      1.5, { top:paddingTop, left:''+(winWidth+picWidth)+'px'}, {top:120, left:0, rotation:-20, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
        tl.fromTo(pictoAddOn, 1.5, { top:paddingTop, left:''+(winWidth+picWidth)+'px'}, {top:120, left:0, rotation:-20, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
    }else if(image.name == 'weightlifting_before'){
        hideAddOnShowPicto();
        tl.fromTo(picto, 1.0, {left:''+(winWidth)+'px'}, {left:0, ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
    }else if(image.name == 'gymnastik_horizontal'){
        hideAddOnShowPicto();
        tl.call(swapGymnast);
        tl.fromTo(picto, 2.5, {left:''+(winWidth)+'px'}, {left:-(2*picWidth)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
        tl.fromTo(pictoAddOn, 2.5, {left:''+(winWidth)+'px'}, {left:-(2*picWidth)+'px', ease:Cubic.easeOut}, 'athleteInStart-='+durCurtainOpen/3);
    }else if(image.name == 'fackellauf'){

        tl.fromTo(picto, 2.5, {left:''+(winWidth+picWidth)+'px'}, {left:-(1.5*picWidth)+'px', ease:Cubic.easeInOut}, '+='+durCurtainOpen/3);
    }else if(image.name == 'hammerwerfen'){
        hideAddOnShowPicto();
        tl.fromTo(picto, 2.5, {left:''+(winWidth)+'px'}, {left:-picWidth+'px',  ease:Cubic.easeIn}, 'athleteInStart-='+durCurtainOpen);
        tl.fromTo(picto, 1, {scaleX:1}, {scaleX:-1}, 'athleteInStart-='+0);
        tl.to(picto, 0.8,  {scaleX:1}, 'athleteInStart+='+0.5);
        tl.to(picto, 0.4,  {scaleX:-1}, 'athleteInStart+='+0.8);
        tl.to(picto, 0.3,  {scaleX:1}, 'athleteInStart+='+1.1);
        tl.to(picto, 0.3,  {scaleX:-1}, 'athleteInStart+='+1.3);
    }else{
       //  tl.call(playSound, [image.sound]);
        tl.fromTo(picto, 1.5, {left:''+(winWidth+picWidth)+'px'}, {left:-(1.5*picWidth)+'px', ease:Cubic.easeOut}, '-='+durCurtainOpen/3);
    }
    tl.addLabel('athleteInEnd');

    tl.call(showPage);

    var durCurtainClose = 1.5;
    var curtainCloseDelay = 0.1;

    if(image.name == 'logo_links'){
         //tl.call(playSound);
        curtainCloseDelay = durCurtainClose/3;
        tl.to(picto, durCurtainClose/holder.$speedUpFactor, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+='+(curtainCloseDelay));
        tl.to(pictoAddOn, durCurtainClose/holder.$speedUpFactor, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+='+(curtainCloseDelay-0.05));
        tl.to(pictoAddOn2, durCurtainClose/holder.$speedUpFactor, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+='+(curtainCloseDelay-0.08));
        tl.to(pictoAddOn3, durCurtainClose/holder.$speedUpFactor, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+='+(curtainCloseDelay-0.1));

    }else if(image.name == 'kugelstossen'){
        curtainCloseDelay = 0.3;
        tl.call(playSound, [image.sound]);
        tl.to(picto, durCurtainClose, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+=0.3');
        tl.to(pictoAddOn, 0.6, {left:'-'+picWidth+'px', top:'-'+picWidth+'px', ease:Expo.easeOut}, 'athleteInEnd-=0.0');
    }else if(image.name == 'gymnastik_reif'){
        durCurtainClose = 1.5;
        curtainCloseDelay = 0.0;
        tl.to(picto, durCurtainClose, {left:''+(winWidth+picWidth)+'px', rotation:'+='+680, ease:Expo.easeOut}, 'athleteInEnd');
    }else if(image.name == 'gymnastik_horizontal'){
       //curtainCloseDelay = -0.3;
    }else if(image.name == 'football'){
        curtainCloseDelay = 0.2;
        tl.to(picto, durCurtainClose, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd');
        tl.to(pictoAddOn, 0.5, {left:''+(-picWidth)+'px', top:'-100px', ease:Expo.easeOut}, 'athleteInEnd');
    }else if(image.name == 'volleyball'){
        curtainCloseDelay = 0.2;
        tl.to(picto, durCurtainClose, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd');
        tl.to(pictoAddOn, 0.5, {left:''+(-100)+'px', top:'-200px', ease:Expo.easeOut}, 'athleteInEnd');
    }else if(image.name == 'speerwurf'){
        tl.call(playSound, [image.sound]);
        tl.to(picto, 1, {rotation:-120, left:''+0-(2*picWidth)+'px', top:'300px', ease:Expo.easeOut}, 'athleteInEnd-=0.3');
        tl.to(pictoAddOn, 1, {left:'-'+picWidth+'px', top:'-'+picWidth+'px', ease:Expo.easeOut}, 'athleteInEnd-=0.3');

        curtainCloseDelay = 0.2;
    }else if(image.name == 'weightlifting_before'){
        curtainCloseDelay = durCurtainClose/3;
        tl.call(playSound, [image.sound]);
        tl.call(hidePictoShowAddOn);
        tl.fromTo(pictoAddOn, durCurtainClose, {left:'0px'}, {left:''+(winWidth+picWidth)+'px', ease:Cubic.easeOut}, 'athleteInEnd+='+curtainCloseDelay);
    }

    tl.addLabel('closeCurtain');
    tl.to(cover, durCurtainClose, {width:"5px", ease:Cubic.easeOut}, 'athleteInEnd+='+curtainCloseDelay);
  
}

function playSound(name){
    console.log('playSound '+name);
    if(!name){
        holder.playSound();
    }else{
        for(var i=0, len=pictograms.length; i<len; i++){
            var pix = pictograms[i];
            //console.log(pix.name);
            if(pix.sound == name && pix.audio){
                pix.audio.play();
                break;
             }
        }
    }

}

function makePictosVisible(){
    holder.$body.find('#pictogramHolder').css('visibility', 'visible');
}

function hidePictoShowAddOn(){
    $("#pictogram").hide();
    $("#pictogramAddOn").show();
}
function hideAddOnShowPicto(){
    $("#pictogram").show();
    $("#pictogramAddOn").hide();
}

function showPictoAndAddOn(){
    $("#pictogram").show();
    $("#pictogramAddOn").show();
}

function showPage(){
    holder.showPage(holder.$page);
}

function unveilScene(){
    holder.unveilScene();
}

function swapGymnast(){
    console.log('swapGymnast');
    setTimeout(swapGymnast2, 100);
}

function swapGymnast2(){
    hidePictoShowAddOn();
    for(var i=0, len=pictograms.length; i<len; i++){
        var pix = pictograms[i];
        if(pix.name == 'gymnastik_horizontal'){
            playSound(pix.sound);
            break;
         }
    }
   
}

function changePictograms(){

    if(holder.isFirstTime){
         image =  logo;
    }else{
        image = pictograms[pictoCount];//Math.floor(Math.random() * this.getCoverImages().length)
        pictoCount = pictoCount == pictograms.length-1 ? 0 : pictoCount + 1;
    
        // hardcode, no random - for testing
        // in combination with ommitting  pictograms = shuffle(pictograms);
       // image = pictograms[0];
    }

   $('#pictogram img').attr("src", 'assets/images/athletics_icons/selection/' + image.name+'.gif');
   var addOn = image.addOn ? image.addOn : 'spacer';
   $('#pictogramAddOn img').attr("src", 'assets/images/athletics_icons/selection/' + addOn+'.gif');
   var addOn2 = image.addOn2 ? image.addOn2 : 'spacer';
   $('#pictogramAddOn2 img').attr("src", 'assets/images/athletics_icons/selection/' + addOn2+'.gif');
   var addOn3 = image.addOn3 ? image.addOn3 : 'spacer';
   $('#pictogramAddOn3 img').attr("src", 'assets/images/athletics_icons/selection/' + addOn3+'.gif');
};

function preLoader(callback){
    console.log('preloader');
    var _self = this,
        imageNames = pictograms.slice(0),// slice creates a clone
        images = [],
        addOns = [],
        count = 0,
        loadCheck;
        imageNames.push(logo);
    for(var i = 0; imageNames.length > i ; i++){
        images[i] = new Image();
        images[i].src = 'assets/images/athletics_icons/selection/' + imageNames[i].name+'.gif';
        if(imageNames[i].addOn){
            var img = new Image();
            img.src = 'assets/images/athletics_icons/selection/' + imageNames[i].addOn+'.gif';
            addOns.push(img);
        }
        if(imageNames[i].addOn2){
            var img = new Image();
            img.src = 'assets/images/athletics_icons/selection/' + imageNames[i].addOn2+'.gif';
            addOns.push(img);
        }
        if(imageNames[i].addOn3){
            var img = new Image();
            img.src = 'assets/images/athletics_icons/selection/' + imageNames[i].addOn3+'.gif';
            addOns.push(img);
        }
        images[i].onload = function(){
            count ++
        }
    }
    loadCheck = setInterval(function(){

        if(count == imageNames.length){
            console.log('preLoader - all images preloaded');
            callback();
            preloadSounds();
            clearInterval(loadCheck);
        }
    }, 100);
};

function preloadSounds(){
    for(var i=0, len=pictograms.length; i<len; i++){
        var pix = pictograms[i];
        if(pix.sound && !pix.audio){
            var soundname = pix.sound;
            console.log('preloadSounds. init load of '+i+' - '+soundname);
            var audio = new Audio('assets/sounds/'+soundname+'.mp3');
            audio.addEventListener('canplaythrough', preloadSounds, false);
            pictograms[i].audio = audio;
            break;
         }
    }
       
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};