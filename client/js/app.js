'use strict';
/* eslint-env browser */
require('../sass/main.scss');

import ajax from './lib/ajax.js';

let types = ['html', 'css', 'javascript'];
let editors = {};

let backend = '//localhost:8222';

types.forEach(type => {
    /* global ace */
    let editor = ace.edit('editor-' + type);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/' + type);
    editors[type] = editor;
});

[].forEach.call(document.querySelectorAll('.btn-save'), $el => {
    $el.addEventListener('click', () => {

        let data = {};
        types.forEach(i => {
            data[i] = editors[i].getValue();
        });

        ajax({
            url: backend + '/save',
            contentType: 'application/json',
            method: 'post',
            data: data
        });

    });
});
