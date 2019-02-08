'use strict';
/* eslint-env browser */
/* global backend */
import ajax from './lib/ajax.js';

export default class Action {
    static save(data, callback) {
        ajax({
            url: backend + '/save',
            contentType: 'application/json',
            method: 'post',
            data: data
        }).then(res => {
            if (res.responseJSON && res.responseJSON.success) {
                callback(res);
            }
            else {
                alert('Error\n\n' + res.responseJSON.error);
            }
        }).catch(err => {
            alert(err.toString() + '\n\nUnable to save. Please try again or report the issue.');
        });
    }

    static preview(data, callback) {
        ajax({
            url: backend + '/preview',
            contentType: 'application/json',
            method: 'post',
            data: data
        }).then(res => {
            callback(res);
        }).catch(err => {
            alert(err.toString() + '\n\nUnable to render. Please try again or report the issue.');
        });
    }

    static load(id, callback) {
        ajax({
            url: backend + '/get/' + id,
            contentType: 'application/json',
            method: 'get'
        }).then(res => {
            if (res.responseJSON) {
                callback(res);
            }
        }).catch(err => {
            alert(err.toString() + '\n\nCould not contact server. Please try again later.');
        });
    }

    static login(options, callback) {
        ajax({
            url: backend + '/login',
            contentType: 'application/json',
            method: 'post',
            data: options
        }).then(res => {
            if (res.responseJSON) {
                callback(res);
            }
        }).catch(err => {
            alert(err.toString() + '\n\nCould not contact server. Please try again later.');
        });
    }
}
