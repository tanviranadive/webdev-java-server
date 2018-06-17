(function(){

    var userService = new UserServiceClient();
    var $username;
    var $password;
    var $verifyPassword;

    $(init);
    function init() {

        $username = $('#usernameFld');
        $password = $('#passwordFld');
        $verifyPassword = $('#verifyPasswordFld');

        $('#registerBtn').click(register);
    }

    function register(){
        console.log("in register");
        var user = {
            username: $username.val(),
            password: $password.val()
        };

        console.log(user);
        userService
            .findUserByUsername(user.username)
            .then(function(response){
                console.log(response);
                if(response.status === 409){
                    console.log("creating new user register");
                    userService.createUser(user).then(function (response) {
                        console.log(response);
                        window.location.href = "/jquery/components/profile/profile.template.client.html?userId=" + response.id
                    })
                }
                else{
                    alert("Username Unavailable");
                }
            });
    }

})();