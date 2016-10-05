import $ from 'jquery';

import * as requester from 'requester';

const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id',
    USER_NAME = 'x-user-name';

let data = (function() {

    function getMaterials() {
        return new Promise((resolve, reject) => {
            $.getJSON('api/materials')
                .done((data) => {
                    resolve(data);
                })
                .fail(reject);
        });
    }

    function login(userData) {

        let url = 'api/users/auth';

        return new Promise((resolve, reject) => {
            requester.putJSON(url, {
                    data: JSON.stringify(userData)
                })
                .then((responseData) => {
                    localStorage.setItem('username', responseData.result.username);
                    localStorage.setItem('authKey', responseData.result.authKey);
                    resolve({
                        username: responseData.username
                    });
                }, (error) => {
                    reject(error);
                });
        });
    }

    function register(userData) {
        let url = 'api/users';

        return new Promise((resolve, reject) => {
            requester.getJSON(url, {
                    data: JSON.stringify(userData)
                })
                .then((responseData) => {
                    resolve({
                        username: responseData.username
                    });
                }, (error) => {
                    reject(error);
                });
        });
    }

    function findUser(username) {

        let url = 'api/profiles/' + username;

        return new Promise((resolve, reject) => {
            $.getJSON(url)
                .done((data) => {
                    resolve(data);
                })
                .fail(reject);
        });
    }


    function getAllUsers() {
        let url = 'api/users';

        return new Promise((resolve, reject) => {
            $.getJSON(url)
                .done((data) => {
                    resolve(data);
                    console.log(data);
                })
                .fail(reject);
        });
    }

    function findMaterial(id) {
        let url = 'api/materials?id=' + id;
        console.log(url);

        return new Promise((resolve, reject) => {
            $.ajax({
                    url: url
                }).done((data) => {
                    resolve(data);
                })
                .fail(reject);
        });
    }

    return {
        getMaterials,
        login,
        register,
        findUser,
        getAllUsers,
        findMaterial
    };


})();

export { data };