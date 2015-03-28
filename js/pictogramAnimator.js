var tl, holder;


function initPictogramAnimator(app){
    holder = app;
    tl = new TimelineLite();
}



function openCurtain(){

    holder.changeCoverImages();

    var cover = holder.$body.find('#cover');
    tl.to(cover, 1, {width:holder.coverWidth, ease:Cubic.easeIn});

    tl.call(showPage);

    tl.addLabel('closeCurtain');
    tl.to(cover, 1.5, {width:"0%", ease:Cubic.easeOut});//

    tl.to($("#pictogram"), 1.5, {left:'-=500px'}, 'closeCurtain-=0.3');

}

function showPage(){
    holder.showPage(holder.$page);
}


function test(){
    console.log('just testing');
  
    var t = $("#test2");
    tl.to(t, 0.9, {left:500, ease:Cubic.easeOut});

}