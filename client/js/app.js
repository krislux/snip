'use strict';
require('../sass/main.scss');

// import ajax from './lib/ajax.js';

let editors = {};

['html', 'css', 'javascript'].forEach(type => {
    /* global ace */
    let editor = ace.edit('editor-' + type);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/' + type);
    editors[type] = editor;
});

console.log(editors);