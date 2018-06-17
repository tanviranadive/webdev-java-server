function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.deleteUser = deleteUser;
    this.findUserById = findUserById;
    this.findUserByUsername = findUserByUsername;
    this.updateUser = updateUser;
    this.updateProfile = updateProfile;
    this.login = login;
    this.url = '/api/user';
    this.login_url = '/api/login';
    this.profile_url = '/api/profile';
    this.register_url = '/api/register';
    var self = this;

    function login(username, password) {
        console.log(username);
        console.log(password);
        return fetch(self.login_url, {
            method: 'post',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
            else {
                alert("Invalid username/password!")
            }
        });
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }

    function createUser(user) {
        console.log(user);
        return fetch(self.url, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json();
        });
    }

    function deleteUser(userId) {
        return fetch(self.url + '/' + userId, {
            method: 'delete'
        })
    }

    function findUserById(userId) {
        console.log("in find user by id service client");
        return fetch(self.url + '/' + userId)
            .then(function(response){
                return response.json();
            });
    }

    function findUserByUsername(username) {
        console.log("find by username client service");
        console.log(username);
        return fetch(self.register_url, {
            method: 'post',
            body: JSON.stringify({username: username}),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    function updateUser(userId, user) {
        console.log("in update user client service");
        return fetch(self.url + '/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                console.log(response);
                if(response.status === 409) {
                    alert('Unable to update');
                } else {
                    alert('success');
                }
            },function(response){
                console.log("Error");
                alert('Unable to update');
            });
    }

    function updateProfile(user) {
        return fetch(self.profile_url, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(success, error);
    }

    function success(response) {
        console.log("In Success")
        if (response.status === 409)
            alert('Unable to update');
        else
            alert("Success");
    }

    function error(response) {
        console.log("In Error")
        alert('Unable to update');
    }
}

