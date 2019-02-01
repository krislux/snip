'use strict';
/* eslint-env browser */
/* global ace, editors, backend */
require('../sass/main.scss');

import Action from './action.js';
import $ from './helpers.js';
import Shadow from './shadow.js';

window.editors = {};
window.backend = '//localhost:8222';

let types = ['html', 'css', 'javascript'];

/**
 * Initialize all editors
 */
types.forEach(type => {
    let editor = ace.edit('editor-' + type);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/' + type);
    editors[type] = editor;
});

const shadow = new Shadow(document.getElementById('shadow'));

/**
 * Save button(s) pressed
 */
$.on('.btn-save', 'click', () => {
    // Perma-save (with visible id and pushState) as opposed to the invisible update.
    // let perma = /^(yes|true|1|on)$/i.test(el.target.getAttribute('data-permanent'));
    let data = {};
    types.forEach(i => {
        data[i] = editors[i].session.getValue();
    });
    
    Action.save(data);
});

$.on('.btn-update', 'click', () => {
    shadow.update();
});

/**
 * Read existing data if location.hash set.
 */
if (location.hash) {
    let id = location.hash.match(/#\/(\w{7})/)[1];
    
    Action.load(id, res => {
        types.forEach(i => {
            editors[i].session.setValue(res.responseJSON[i]);
        });
        document.getElementById('editor-preview').src = backend + '/render/' + id;
    });
}
