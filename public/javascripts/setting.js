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
        if (isEmail() && isUsername() && isPassword()) {
            $.ajax({
                url: "/setting",
                type: "POST",
                data: $('#setting').serialize(),
                success: function (data) {
                    if (data.result == 0) {
                        alert("Please confirm password again!");
                    } else if (data.result == 1) {
                        alert("Please set it again!");
                    } else {
                        alert(data.result);
                        window.location.href = "/home";
                    }
                },
                error: function () {
                    alert("Connection failed!");
                }
            })
        }
    })

    function isEmail(){
        var reg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$");
        var obj = document.getElementById("email");
        if(obj.value === ""){
            alert("Email cannot be empty!");
            return false;
        }else if(!reg.test(obj.value)){
            alert("Email is not allowed.");
            return false;
        }else{
            return true;
        }
    }

    function isUsername(){
        var reg = new RegExp("^[A-Za-z0-9]{8,60}$");
        var obj = document.getElementById("username");
        if(obj.value === ""){
            alert("Username cannot be empty!");
            return false;
        }else if(!reg.test(obj.value)){
            alert("Username must be 8-60 numbers or letters!");
            return false;
        }else{
            return true;
        }
    }

    function isPassword(){
        var reg = new RegExp("^[A-Za-z0-9]{8,20}$");
        var obj = document.getElementById("password1");
        if(!reg.test(obj.value)){
            alert("Password must be 8-20 numbers or letters!");
            return false;
        }else{
            return true;
        }
    }
})