$(document).ready(function(){
    $.ajax({
        url: "/person",
        type: "POST",
        data: {username: document.getElementById('username').value},
        success: function (data) {
            document.getElementById('firstname').value = data.result.firstname;
            document.getElementById('lastname').value = data.result.lastname;
            document.getElementById('email').value = data.result.email;
        }
    });

    $('#submit').click(function (){
        $.ajax({
            url: "/setting",
            type: "POST",
            data: $('#setting').serialize(),
            success: function (data) {
                if (data.result == 0){
                    alert("Please confirm password again!");
                }else if(data.result == 1) {
                    alert("Please set it again!");
                }else{
                    alert(data.result);
                    window.location.href = "/home";
                }
            },
            error: function () {
                alert("Connection failed!");
            }
        })
    })
})