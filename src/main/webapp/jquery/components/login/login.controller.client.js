(function(){
    var userService = new UserServiceClient();
    var $username;
    var $password;
    $(init);

    function init(){
        $username = $('#usernameFld');
        $password = $('#passwordFld');

        $('#loginBtn').click(login);
    }

    function login(){

        var user = {
            username: $username.val(),
            password: $password.val()
        };

        console.log(user.username);
        console.log(user.password);

        userService
            .login(user.username,user.password)
            .then(function(response){
                console.log(response);
                window.location.href = "/jquery/components/profile/profile.template.client.html?userId=" + response.id;
            })
    }
})();