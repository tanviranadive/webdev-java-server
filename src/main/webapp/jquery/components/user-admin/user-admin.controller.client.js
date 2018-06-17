(function(){

    var tbody;
    var template;
    var $username;
    var $password;
    var $firstName;
    var $lastName;
    var $role;

    var userService = new UserServiceClient();
    $(init);

    function init() {
        $username = $('#usernameFld')
        $password = $('#passwordFld')
        $firstName = $('#firstNameFld')
        $lastName = $('#lastNameFld')
        $role = $('#roleFld')
        tbody = $('.wbdv-tbody');
        template = $('.wbdv-template');

        $('#createUser').click(createUser);
        $('#update').click(updateUser);

        findAllUsers();
    }

    function findAllUsers(){
        userService.findAllUsers()
            .then(renderUsers)
    }

    function renderUsers(users){
        tbody.empty();
        for(var i=0;i<users.length;i++){
            var user = users[i];
            console.log(user);
            var clone = template.clone();
            clone.attr('id', user.id);
            clone.find('.wbdv-remove').click(deleteUser);
            clone.find('.wbdv-edit').click(editUser);

            clone.find('.wbdv-username')
                .html(user.username);
            clone.find('.wbdv-first-name')
                .html(user.firstName);
            clone.find('.wbdv-last-name')
                .html(user.lastName);
            clone.find('.wbdv-role')
                .html(user.role);
            tbody.append(clone);
        }
    }

    function createUser(){
        console.log("creating user");

        var user = {
            username: $username.val(),
            password: $password.val(),
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            role:   $role.val()
        };

        userService.createUser(user)
            .then(findAllUsers);
    }

    function deleteUser(event) {
        console.log("delete");
        var deleteBtn = $(event.currentTarget);
        var userId = deleteBtn
            .parent()
            .parent()
            .parent()
            .attr('id');

        userService
            .deleteUser(userId)
            .then(findAllUsers);
    }

    function editUser(event) {
        console.log('edit user');
        var selectBtn = $(event.currentTarget);
        var userId = selectBtn
            .parent()
            .parent()
            .parent()
            .attr('id');
        id=userId;
        findUserById(userId)
    }

    function findUserById(userId) {
        userService
            .findUserById(userId)
            .then(renderUser);
    }

    function renderUser(user) {
        console.log(user);
        $username.val(user.username);
        $firstName.val(user.firstName);
        $lastName.val(user.lastName);
        $role.val(user.role);
    }

    function updateUser(){
        console.log("update user");

        var newuser = {
            username: $username.val(),
            password: $password.val(),
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            role:   $role.val()
        };
        console.log(newuser);
        userService
            .updateUser(id,newuser)
            .then(findAllUsers);
    }
})();