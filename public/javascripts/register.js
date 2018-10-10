$(document).ready(function(){
    $('#submit').click(function () {
        if (isEmail() && isUsername() && isPassword()){
            $.ajax({
                url: "/register",
                type: "POST",
                data: $('#register').serialize(),
                success: function (data) {
                    if (data.result == 0){
                        alert("Username has already been used!");
                    }else{
                        alert("Register success!");
                        window.location.href = "/";
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
        var obj = document.getElementById("password");
        if(obj.value === ""){
            alert("Password cannot be empty!");
            return false;
        }else if(!reg.test(obj.value)){
            alert("Password must be 8-20 numbers or letters!");
            return false;
        }else{
            return true;
        }
    }
})