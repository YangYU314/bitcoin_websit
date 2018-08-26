$(document).ready(function(){
    $('#submit').click(function () {
        $.ajax({
            url: "/register",
            type: "POST",
            data: $('#register').serialize(),
            success: function (data) {
                if (data.result == 0){
                    alert("Username has already been used!");
                }else{
                    alert("Register success!");
                    window.location.href = "login";
                }
            },
            error: function () {
                alert("Connection failed!");
            }
        })
    })
})