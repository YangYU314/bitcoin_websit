$(document).ready(function(){
    $('#logout').click(function(){
        click_logout();
    });
})

//logout
function click_logout(){
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (data) {
            if (data.result == 0){
                window.location.href = "login";
            }
        },
        error: function () {
            alert("Connection failed!");
        }
    })
}