'use strict';
/* eslint-env browser */
/* global ace, editors */
require('../sass/main.scss');

import ajax from './lib/ajax.js';

window.editors = {};

let types = ['html', 'css', 'javascript'];

let backend = '//localhost:8222';

/**
 * Initialize all editors
 */
types.forEach(type => {
    let editor = ace.edit('editor-' + type);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/' + type);
    editors[type] = editor;
});

/**
 * Saving
 */
[].forEach.call(document.querySelectorAll('.btn-save'), $el => {
    $el.addEventListener('click', () => {

        let data = {};
        types.forEach(i => {
            data[i] = editors[i].session.getValue();
        });

        ajax({
            url: backend + '/save',
            contentType: 'application/json',
            method: 'post',
            data: data
        }).then(res => {
            if (res.responseJSON && res.responseJSON.success) {
                history.pushState(null, null, '#/' + res.responseJSON.id);
            }
            else {
                alert('Something went wrong.');
            }
        });
    });
});

/**
 * Read existing data if location.hash set.
 */
if (location.hash) {
    let id = location.hash.match(/#\/(\w{7})/)[1];
    ajax({
        url: backend + '/get/' + id,
        contentType: 'application/json',
        method: 'get'
    }).then(res => {
        if (res.responseJSON) {
            types.forEach(i => {
                editors[i].session.setValue(res.responseJSON[i]);
            });
            document.getElementById('editor-preview').src = backend + '/render/' + id;
        }
    });
}