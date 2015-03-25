//instantiate a TimelineLite    
var tl = new TimelineLite();
//tl.from(head, 0.5, {left:100, opacity:0});

var holder;
function initPictogramAnimator(app){
    holder = app;
}

function openCurtain(){
    console.log('openCurtain');
    holder.changeCoverImages();


    holder.$body.find('#cover')
        .animate({
            width: holder.coverWidth
        }, 500/$speedUpFactor, 'easeOutCubic',  function(){
            // Show requested page
            holder.showPage(holder.$page);
            setTimeout(function(){
                holder.$body.find('#cover').animate({
                    width: 5
                }, 500/$speedUpFactor,'easeInCubic')

            }, 200/$speedUpFactor)
        })

}