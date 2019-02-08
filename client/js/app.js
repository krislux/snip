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
 * Update button pressed, render preview without saving.
 */
$.on('.btn-preview', 'click', () => {
    let data = {};
    let length = 0;

    types.forEach(i => {
        data[i] = editors[i].session.getValue();
        length += data[i].length;
    });

    let preview = document.getElementById('editor-preview');

    if (length === 0) {
        preview.src = 'data:text/html;';
    }
    else {
        Action.preview(data, res => {
            preview.src = 'data:text/html;charset=UTF-8,' + encodeURIComponent(res.response);
        });
    }
});

/**
 * Save button(s) pressed, save content and push state.
 */
$.on('.btn-save', 'click', event => {
    let id = null;
    if (event.target.classList.contains('save-over')) {
        id = $.getActiveId();
    }

    let data = {
        token: $.getToken(),
        view: document.body.className,
        id: id
    };
    types.forEach(i => {
        data[i] = editors[i].session.getValue();
    });

    Action.save(data, res => {
        history.pushState({ id: res.responseJSON.id }, null, '#/' + res.responseJSON.id);

        document.getElementById('editor-preview').src = backend + '/render/' + res.responseJSON.id;
    });
});

/**
 * Sign out by deleting all local tokens.
 */
$.on('.btn-signout', 'click', () => {
    sessionStorage.removeItem('login_token');
    localStorage.removeItem('login_token');

    [].forEach.call(document.querySelectorAll('.menu-switcher'), el => {
        el.classList.remove('authed');
    });
});

/**
 * Login - triggered by login form submission.
 */
$.on('#signin-form', 'submit', event => {
    event.preventDefault();

    // Remove existing tokens.
    sessionStorage.removeItem('login_token');
    localStorage.removeItem('login_token');

    let options = {
        username: document.getElementById('signin-username').value,
        password: document.getElementById('signin-password').value,
        persistent: document.getElementById('signin-persistent').value == 'on'
    };

    Action.login(options, res => {
        if (res.responseJSON) {
            if (res.responseJSON.success) {
                if (res.responseJSON.persistent) {
                    localStorage.setItem('login_token', res.responseJSON.token);
                }
                else {
                    sessionStorage.setItem('login_token', res.responseJSON.token);
                }

                // Change the menu to reflect logged in status.
                [].forEach.call(document.querySelectorAll('.menu-switcher'), el => {
                    el.classList.add('authed');
                });
                document.getElementById('signin-form').style.display = 'none';
            }
            else {
                alert(res.responseJSON.error);
            }
        }
    });
});

/**
 * Switching between tabs in tabbed layout.
 */
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

/**
 * Button pressed to switch between grid and tab layout.
 */
$.on('.layout-switcher button', 'click', event => {
    document.body.classList.remove('grid', 'tabbed');
    document.body.classList.add(event.target.value);

    types.forEach(i => {
        editors[i].resize();
    });
});

/**
 * Always close drop-down menus when clicking any menu item.
 */
$.on('.drop-down button', 'click', event => {
    event.target.parentElement.parentElement.style.display = 'none';
});

/**
 * Read existing data if location.hash set.
 */
if (location.hash) {
    let id = $.getActiveId();

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

/**
 * If login token exists, set menu to logged in state immediately.
 */
if ($.getToken()) {
    [].forEach.call(document.querySelectorAll('.menu-switcher'), el => {
        el.classList.add('authed');
    });
}
