$(document).ready(function(){
    $('#submit').click(function () {
        $.ajax({
            url: "/login",
            type: "POST",
            data: $('#login').serialize(),
            success: function (data) {
                if (data.result == 0){
                    alert("Error! Please input username and password again!");
                }else if (data.result == 1){
                    alert("Please logout first!");
                }else{
                    //window.open("home", '_self');
                    window.location.href = "home";
                    window.event.returnValue = false;
                }
            },
            error: function () {
                alert("Connection failed!");
            }
        })
    })
})

function g(id){
    return document.getElementById(id);
}

function autoCenter( el ){
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW-elW)/2 + 'px';
    el.style.top = (bodyH-elH)/2 + 'px';

}


function fillToBody( el ){
    el.style.width  = document.documentElement.clientWidth  +'px';
    el.style.height = document.documentElement.clientHeight + 'px';
}

document.onmouseup = function(e){

    dialogInstace = false;
    clearInterval(onMoveStartId);

}


document.onmousemove = function(e) {
    var e = e || window.event;
    var instace = dialogInstace;
    if (instace) {

        var maxX = document.documentElement.clientWidth -  instace.moveElement.offsetWidth;
        var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight ;

        instace.moveElement.style.left = Math.min( Math.max( ( e.pageX - instace.mouseOffsetLeft) , 0 ) , maxX) + "px";
        instace.moveElement.style.top  = Math.min( Math.max( ( e.pageY - instace.mouseOffsetTop ) , 0 ) , maxY) + "px";
    }
    if(e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
};

function showDialog(){
    g('dialogMove').style.display = 'block';
    g('mask').style.display = 'block';
    autoCenter( g('dialogMove') );
    fillToBody( g('mask') );
    $(document).keypress(function(e) {
        if((e.keyCode || e.which) == 13) {
            $("#submit").click();
        }
    });
}


function hideDialog(){
    g('dialogMove').style.display = 'none';
    g('mask').style.display = 'none';
}

