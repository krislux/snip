'use strict';
/* eslint-env browser */
/* global ace, editors, backend */
require('../sass/main.scss');

import Action from './action.js';
import $ from './helpers.js';

window.editors = {};
window.backend = '//localhost:8222';

let types = ['html', 'css', 'javascript'];

/**
 * Initialize all editors
 */
types.forEach(type => {
    let editor = ace.edit('editor-' + type, {
        theme: 'ace/theme/monokai',
        mode: 'ace/mode/' + type
    });
    editors[type] = editor;
});

/**
 * Save button(s) pressed
 */
$.on('.btn-save', 'click', event => {
    // Perma-save (with visible id and pushState) as opposed to the invisible update.
    let permanent = /^(yes|true|1|on)$/i.test(event.target.getAttribute('data-permanent'));
    let data = {
        permanent: !!permanent,
        view: document.body.className
    };
    types.forEach(i => {
        data[i] = editors[i].session.getValue();
    });
    
    Action.save(data, res => {
        if (res.responseJSON.push) {
            history.pushState({ id: res.responseJSON.id }, null, '#/' + res.responseJSON.id);
        }
        document.getElementById('editor-preview').src = backend + '/render/' + res.responseJSON.id;
    });
});

$.on('#signin-form', 'submit', event => {
    event.preventDefault();
    
    let username = document.getElementById('signin-username').value;
    let password = document.getElementById('signin-password').value;
    let persistent = document.getElementById('signin-persistent').value == 'on';
    
    
});

$.on('.tab-container button', 'click', event => {
    [].forEach.call(document.querySelectorAll('.tab-container button'), el => {
        let target = document.getElementById('editor-' + el.value).parentElement;
        if (el.value == event.target.value) {
            target.classList.add('active');
            el.classList.add('active');

            if (editors[el.value]) {
                editors[el.value].resize();
            }
        }
        else {
            target.classList.remove('active');
            el.classList.remove('active');
        }
    });
});

$.on('.layout-switcher button', 'click', event => {
    document.body.classList.remove('grid', 'tabbed');
    document.body.classList.add(event.target.value);
});

/**
 * Read existing data if location.hash set.
 */
if (location.hash) {
    let id = location.hash.match(/#\/(\w{7})/)[1];
    
    Action.load(id, res => {
        if (res.responseJSON && res.responseJSON.success) {
            document.body.className = res.responseJSON.view;
            
            types.forEach(i => {
                editors[i].session.setValue(res.responseJSON[i]);
            });
            document.getElementById('editor-preview').src = backend + '/render/' + id;
        }
        else {
            alert('Error\n\nCouldn\'t load snip\n\n' + res.responseJSON.error);
        }
    });
}
