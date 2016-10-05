import Sammy from 'Sammy';
import $ from 'jquery';

import * as controller from 'controller';

let app = new Sammy('#container', function() {
    this.before({ except: {} }, function() {
        controller.loadNavigation();
    });

    this.get('/#/home', function() {
        controller.generateMaterials();
    });

    this.get('/#/', function() {
        this.redirect('#/home');
    });

    this.get('/#/login', function(context) {
        controller.login(context);
    });

    this.get('/#/register', function(context) {
        controller.register(context);
    });

    this.get('/#/logout', function() {
        controller.logout();
        this.redirect('/#/home');
    });

    this.get('/#/users/:username', function(context) {
        controller.userProfile(this.params['username']);
    });

    this.get('/#/search', function() {
        controller.search();
    });

    this.get('/#/materials/:id', function() {
        controller.showMaterial(this.params['id']);
    });
});


$(function() {
    app.run('#/');
}());