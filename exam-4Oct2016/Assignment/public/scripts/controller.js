import $ from 'jquery';
import handlebars from 'handlebars';

import { data } from 'data';
import { loadTemplate } from 'template';

const $container = $('#container');

function generateMaterials() {
    loadTemplate('material.html')
        .then((htmlTemplate) => {

            data.getMaterials().then((data) => {

                let templateFunc = handlebars.compile(htmlTemplate);
                let html = templateFunc(data);
                $container.html(html);
            });
        });
}

function loadNavigation() {

    let template;

    if (userLoged()) {
        template = 'navbar-authorised.html';
    } else {
        template = 'navbar-guest.html';
    }
    loadTemplate(template)
        .then((htmlTemplate) => {
            $('#navigation').html(htmlTemplate);
        });
}


function login(context) {
    loadTemplate('login.html')
        .then((htmlTemplate) => {
            $container.html(htmlTemplate);
            $('#btn-login').on('click', function() {
                let userData = {
                    username: $('#tb-username-login').val(),
                    password: $('#tb-password-login').val()
                };

                data.login(userData)
                    .then((responseData) => {
                        context.redirect('/#/home');
                        console.log('Logged in');
                    }, (error) => {
                        console.log('Invalid credentials');
                    });
            });
        });
}


function logout() {
    localStorage.clear();
}

function register(context) {
    loadTemplate('register.html')
        .then((htmlTemplate) => {
            $container.html(htmlTemplate);
            $('#btn-register').on('click', function() {
                let userData = {
                    username: $('#tb-username-register').val(),
                    password: $('#tb-password-register').val()
                };

                data.register(userData)
                    .then((responseData) => {
                        console.log('registered');
                        data.login(userData).then((responseData) => {
                            context.redirect('/#/home');
                            console.log('Logged in');
                        });
                    }, (error) => {
                        console.log('Invalid credentials');
                    });
            });
        });
}

function userLoged() {
    if (localStorage.getItem('authKey')) {
        return true;
    } else {
        return false;
    }
}

function userProfile(username) {
    loadTemplate('user-profile.html')
        .then((htmlTemplate) => {
            data.findUser(username)
                .then((data) => {
                    let templateFunc = handlebars.compile(htmlTemplate);
                    let html = templateFunc(data.result);
                    $container.html(html);
                });
        });
}

function showMaterial(id) {
    console.log(id);
    loadTemplate('material-info.html')
        .then((htmlTemplate) => {
            data.findMaterial(id)
                .then((data) => {
                    let templateFunc = handlebars.compile(htmlTemplate);
                    let html = templateFunc(data.result);
                    $container.html(html);
                });
        });
}

function search() {
    loadTemplate('search.html')
        .then((htmlTemplate) => {
            data.getAllUsers().then((data) => {
                let templateFunc = handlebars.compile(htmlTemplate);
                let html = templateFunc(data);
                $container.html(html);


                let tbSearch = document.getElementById('search-profiles');
                tbSearch.addEventListener('input', onInputlblSearch, false);
            });

        });
}



function onInputlblSearch() {

    let listItems = [];
    if (listItems.length === 0) {
        let select = document.getElementsByClassName('list-items');
        listItems = jQuery.makeArray(select);
    }

    let text,
        pattern = $('#search-profiles').val();

    for (let i = 0, len = listItems.length; i < len; i += 1) {
        text = listItems[i].innerHTML.toLowerCase();

        if (text.indexOf(pattern) < 0) {
            listItems[i].style.display = "none";
        } else {
            listItems[i].style.display = "";
        }
    }
}

export { generateMaterials, loadNavigation, login, logout, register, userProfile, search, showMaterial };