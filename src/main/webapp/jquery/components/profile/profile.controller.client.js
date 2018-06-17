(function(){
    $(init);

    var $staticUsername;
    var $staticEmail;
    var $firstName;
    var $lastName;
    var $role;
    var $phone;
    var $dob;
    var $email;
    var $updateBtn;
    var $logoutBtn;
    var id;
    var userService = new UserServiceClient();

    function init(){
        $staticUsername = $("#staticUsername");
        $staticEmail = $("#staticEmail");
        $firstName = $("#firstName");
        $lastName = $("#lastName");
        $role=  $("#role");
        $phone = $("#phone");
        $dob = $("#dob");
        $email = $("#email");
        $updateBtn = $("#updateBtn")
            .click(updateProfile);
        $logoutBtn = $("#logoutBtn")
            .click(logout);

        id = parseUrl()[1];
        findUserById(id);
    }

    function parseUrl() {
        var parts = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var part = parts.split('=');
        return part;
    }

    function updateProfile() {
        //console.log("update profile");
        var user = {
            id:id,
            username: $staticUsername.val(),
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            role: $role.val(),
            phone: $phone.val(),
            email: $email.val(),
            dob: $dob.val()
        };

        userService
            .updateProfile(user);
        console.log(user);
    }

    function findUserById(userId) {
        console.log("find user by id");
            userService
                .findUserById(userId)
                .then(renderUser);
    }

    function renderUser(user) {
        $staticUsername.val(user.username);
        $firstName.val(user.firstName);
        $lastName.val(user.lastName);
        $role.val(user.role);
        $phone.val(user.phone);
        $dob.val(user.dob);
        $email.val(user.email);
    }

    function logout(){
        console.log("Logout");
        window.location.href = "/jquery/components/login/login.template.client.html"
    }
})();