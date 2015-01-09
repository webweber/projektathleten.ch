$(function(){
    var $body;

    function switchPage(){
        var path = location.pathname,
            pathArray = path.split('/');
        for(var i = 0; pathArray.length > i; i ++){
            if(pathArray[i]){
                console.log(pathArray[i]);
                displayContent(pathArray[i]);
            }
        }
    }

    window.onpopstate = switchPage
});
