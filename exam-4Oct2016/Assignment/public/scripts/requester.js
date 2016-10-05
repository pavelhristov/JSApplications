'use strict';

import $ from 'jquery';

function makeRequest(url, method, options) {
    options = options || {};
    options.headers = options.headers || {};
    method = method || 'GET';
    let data = options.data || {};

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: method,
            headers: options.headers,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

function getJSON(url, options) {
    options = options || {};
    options.headers.contentType = 'application/json';
    return makeRequest(url, 'GET', options);
}

function postJSON(url, options) {

    //options = options || {};
    //options.headers.contentType = 'application/json';
    //return makeRequest(url, 'POST', options);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: options.data,
            success: resolve,
            error: reject
        });
    });
}

function putJSON(url, options) {
    console.log(options);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: 'PUT',
            contentType: 'application/json',
            data: options.data,
            success: resolve,
            error: reject
        });
    });
}

function get(url, options) {
    return makeRequest(url, 'GET', options);
}

function post(url, options) {
    return makeRequest(url, 'POST', options);
}

function put(url, options) {
    return makeRequest(url, 'PUT', options);
}

export { getJSON, postJSON, putJSON, get, post, put };