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