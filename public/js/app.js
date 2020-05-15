/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/action.js":
/*!*********************************!*\
  !*** ./src/assets/js/action.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-env browser */\n/* global backend */\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _ajax = __webpack_require__(/*! ./lib/ajax.js */ \"./src/assets/js/lib/ajax.js\");\n\nvar _ajax2 = _interopRequireDefault(_ajax);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Action = function () {\n    function Action() {\n        _classCallCheck(this, Action);\n    }\n\n    _createClass(Action, null, [{\n        key: 'save',\n        value: function save(data, callback) {\n            (0, _ajax2.default)({\n                url: backend + '/save',\n                contentType: 'application/json',\n                method: 'post',\n                data: data\n            }).then(function (res) {\n                if (res.responseJSON && res.responseJSON.success) {\n                    callback(res);\n                } else {\n                    alert('Error\\n\\n' + res.responseJSON.error);\n                }\n            }).catch(function (err) {\n                alert(err.toString() + '\\n\\nUnable to save. Please try again or report the issue.');\n            });\n        }\n    }, {\n        key: 'preview',\n        value: function preview(data, callback) {\n            (0, _ajax2.default)({\n                url: backend + '/preview',\n                contentType: 'application/json',\n                method: 'post',\n                data: data\n            }).then(function (res) {\n                callback(res);\n            }).catch(function (err) {\n                alert(err.toString() + '\\n\\nUnable to render. Please try again or report the issue.');\n            });\n        }\n    }, {\n        key: 'load',\n        value: function load(id, callback) {\n            (0, _ajax2.default)({\n                url: backend + '/get/' + id,\n                contentType: 'application/json',\n                method: 'get'\n            }).then(function (res) {\n                if (res.responseJSON) {\n                    callback(res);\n                }\n            }).catch(function (err) {\n                alert(err.toString() + '\\n\\nCould not contact server. Please try again later.');\n            });\n        }\n    }, {\n        key: 'login',\n        value: function login(options, callback) {\n            (0, _ajax2.default)({\n                url: backend + '/login',\n                contentType: 'application/json',\n                method: 'post',\n                data: options\n            }).then(function (res) {\n                if (res.responseJSON) {\n                    callback(res);\n                }\n            }).catch(function (err) {\n                alert(err.toString() + '\\n\\nCould not contact server. Please try again later.');\n            });\n        }\n    }]);\n\n    return Action;\n}();\n\nexports.default = Action;\n\n//# sourceURL=webpack:///./src/assets/js/action.js?");

/***/ }),

/***/ "./src/assets/js/app.js":
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-env browser */\n/* global ace, editors, backend */\n\nvar _action = __webpack_require__(/*! ./action.js */ \"./src/assets/js/action.js\");\n\nvar _action2 = _interopRequireDefault(_action);\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"./src/assets/js/helpers.js\");\n\nvar _helpers2 = _interopRequireDefault(_helpers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n__webpack_require__(/*! ../sass/main.scss */ \"./src/assets/sass/main.scss\");\n\nwindow.editors = {};\nwindow.backend = 'http://' + location.hostname;\n\nvar types = ['html', 'css', 'javascript'];\n\n/**\r\n * Initialize all editors\r\n */\ntypes.forEach(function (type) {\n    var editor = ace.edit('editor-' + type, {\n        theme: 'ace/theme/monokai',\n        mode: 'ace/mode/' + type,\n        showPrintMargin: false\n    });\n    editors[type] = editor;\n});\n\n/**\r\n * Update button pressed, render preview without saving.\r\n */\n_helpers2.default.on('.btn-preview', 'click', function () {\n    var data = {};\n    var length = 0;\n\n    types.forEach(function (i) {\n        data[i] = editors[i].session.getValue();\n        length += data[i].length;\n    });\n\n    var preview = document.getElementById('editor-preview');\n\n    if (length === 0) {\n        preview.src = 'data:text/html;';\n    } else {\n        _action2.default.preview(data, function (res) {\n            preview.src = 'data:text/html;charset=UTF-8,' + encodeURIComponent(res.response);\n        });\n    }\n});\n\n/**\r\n * Save button(s) pressed, save content and push state.\r\n */\n_helpers2.default.on('.btn-save', 'click', function (event) {\n    var id = null;\n    if (event.target.classList.contains('save-over')) {\n        id = _helpers2.default.getActiveId();\n    }\n\n    var data = {\n        token: _helpers2.default.getToken(),\n        view: document.body.className,\n        id: id\n    };\n    types.forEach(function (i) {\n        data[i] = editors[i].session.getValue();\n    });\n\n    _action2.default.save(data, function (res) {\n        history.pushState({ id: res.responseJSON.id }, null, '#/' + res.responseJSON.id);\n\n        document.getElementById('editor-preview').src = backend + '/render/' + res.responseJSON.id;\n    });\n});\n\n/**\r\n * Sign out by deleting all local tokens.\r\n */\n_helpers2.default.on('.btn-signout', 'click', function () {\n    sessionStorage.removeItem('login_token');\n    localStorage.removeItem('login_token');\n\n    [].forEach.call(document.querySelectorAll('.menu-switcher'), function (el) {\n        el.classList.remove('authed');\n    });\n});\n\n/**\r\n * Login - triggered by login form submission.\r\n */\n_helpers2.default.on('#signin-form', 'submit', function (event) {\n    event.preventDefault();\n\n    // Remove existing tokens.\n    sessionStorage.removeItem('login_token');\n    localStorage.removeItem('login_token');\n\n    var options = {\n        username: document.getElementById('signin-username').value,\n        password: document.getElementById('signin-password').value\n    };\n    var persistent = document.getElementById('signin-persistent').value == 'on';\n\n    _action2.default.login(options, function (res) {\n        if (res.responseJSON) {\n            if (res.responseJSON.success) {\n                if (persistent) {\n                    localStorage.setItem('login_token', res.responseJSON.token);\n                } else {\n                    sessionStorage.setItem('login_token', res.responseJSON.token);\n                }\n\n                // Change the menu to reflect logged in status.\n                [].forEach.call(document.querySelectorAll('.menu-switcher'), function (el) {\n                    el.classList.add('authed');\n                });\n                document.getElementById('signin-form').style.display = 'none';\n            } else {\n                alert(res.responseJSON.error);\n            }\n        }\n    });\n});\n\n/**\r\n * Switching between tabs in tabbed layout.\r\n */\n_helpers2.default.on('.tab-container button', 'click', function (event) {\n    [].forEach.call(document.querySelectorAll('.tab-container button'), function (el) {\n        var target = document.getElementById('editor-' + el.value).parentElement;\n        if (el.value == event.target.value) {\n            target.classList.add('active');\n            el.classList.add('active');\n\n            if (editors[el.value]) {\n                editors[el.value].resize();\n            }\n        } else {\n            target.classList.remove('active');\n            el.classList.remove('active');\n        }\n    });\n});\n\n/**\r\n * Button pressed to switch between grid and tab layout.\r\n */\n_helpers2.default.on('.layout-switcher button', 'click', function (event) {\n    document.body.classList.remove('grid', 'tabbed');\n    document.body.classList.add(event.target.value);\n\n    types.forEach(function (i) {\n        editors[i].resize();\n    });\n});\n\n/**\r\n * Always close drop-down menus when clicking any menu item.\r\n */\n_helpers2.default.on('.drop-down button', 'click', function (event) {\n    event.target.parentElement.parentElement.style.display = 'none';\n});\n\n/**\r\n * Read existing data if location.hash set.\r\n */\nif (location.hash) {\n    var id = _helpers2.default.getActiveId();\n\n    _action2.default.load(id, function (res) {\n        if (res.responseJSON && res.responseJSON.success) {\n            document.body.className = res.responseJSON.view;\n\n            types.forEach(function (i) {\n                editors[i].session.setValue(res.responseJSON[i]);\n            });\n            document.getElementById('editor-preview').src = backend + '/render/' + id;\n        } else {\n            alert('Error\\n\\nCouldn\\'t load snip\\n\\n' + res.responseJSON.error);\n        }\n    });\n}\n\n/**\r\n * If login token exists, set menu to logged in state immediately.\r\n */\nif (_helpers2.default.getToken()) {\n    [].forEach.call(document.querySelectorAll('.menu-switcher'), function (el) {\n        el.classList.add('authed');\n    });\n}\n\n//# sourceURL=webpack:///./src/assets/js/app.js?");

/***/ }),

/***/ "./src/assets/js/helpers.js":
/*!**********************************!*\
  !*** ./src/assets/js/helpers.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/* eslint-env browser */\nvar $ = function () {\n    function $() {\n        _classCallCheck(this, $);\n    }\n\n    _createClass($, null, [{\n        key: 'on',\n        value: function on(query, event, callback) {\n            [].forEach.call(document.querySelectorAll(query), function (el) {\n                el.addEventListener(event, callback);\n            });\n        }\n    }, {\n        key: 'getActiveId',\n        value: function getActiveId() {\n            var m = location.hash.match(/#\\/(\\w{7})/);\n            return m && m[1] ? m[1] : null;\n        }\n    }, {\n        key: 'getToken',\n        value: function getToken() {\n            return localStorage.getItem('login_token') || sessionStorage.getItem('login_token');\n        }\n    }]);\n\n    return $;\n}();\n\nexports.default = $;\n\n\n$.on('.toggle', 'click', function (event) {\n    var targets = event.target.getAttribute('data-target');\n    if (targets) {\n        targets = document.querySelectorAll(targets);\n    } else {\n        targets = [event.target.nextElementSibling];\n    }\n\n    for (var i = 0; i < targets.length; i++) {\n        if (window.getComputedStyle(targets[i]).display != 'none') {\n            targets[i].style.display = 'none';\n        } else {\n            targets[i].style.display = 'block';\n        }\n    }\n});\n\n//# sourceURL=webpack:///./src/assets/js/helpers.js?");

/***/ }),

/***/ "./src/assets/js/lib/ajax.js":
/*!***********************************!*\
  !*** ./src/assets/js/lib/ajax.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nexports.default = ajax;\n/**\r\n * Super simple AJAX Promise helper.\r\n * \r\n * @author  Kris Lux <mail@kilolima.dk>\r\n * @version 1.0\r\n * @license MIT\r\n */ /**\r\n    * Does not support Internet Explorer at all, as it doesn't support Promises.\r\n    * This can be fixed with a Promise polyfill.\r\n    * Support: Edge 12+, Firefox 29+, Chrome 33+, Safari 7.1+, Android 4.4.4+, iOS Safari 8+.\r\n    * \r\n    * Usage:\r\n    *      ajax('file.json').then(xhr => { ... });\r\n    * or\r\n    *      ajax({ url: 'file.json', method: 'post' }).then(xhr => { ... });\r\n    * \r\n    * @param   {(object|string)}   options               // If string this is the url, if object see below.\r\n    * @param   {string}   [options.method]               // HTTP method to use, defaults to GET.\r\n    * @param   {string}   [options.url]                  // Any valid url to call.\r\n    * @param   {(object|FormData|string)} [options.data] // Body data for POST etc.\r\n    * @param   {object}   [options.headers]              // Custom headers in {name:value} format.\r\n    * @param   {string}   [options.contentType]          // Shorthand for Content-Type header.\r\n    * @param   {boolean}  [options.async]                // Defaults to true, pass false to block execution.\r\n    * @param   {string}   [options.user]                 // Authentication username.\r\n    * @param   {string}   [options.password]             // Authentication password.\r\n    * \r\n    * @return  {Promise}  Arg is XmlHttpRequest with added properties responseJSON (if JSON).\r\n    */\nfunction ajax(options) {\n\n    if (typeof options === 'string') options = { url: options };\n\n    return new Promise(function (resolve, reject) {\n\n        var xhr = new XMLHttpRequest();\n\n        xhr.addEventListener('readystatechange', function () {\n            if (this.readyState === 4) {\n                if (this.status >= 200 && this.status <= 299) {\n                    if (/^application\\/json/.test(this.getResponseHeader('Content-Type'))) {\n                        this.responseJSON = JSON.parse(this.response);\n                    }\n                    resolve(this);\n                } else {\n                    reject(Error(this.statusText));\n                }\n            }\n        });\n\n        xhr.open((options.method || 'GET').toUpperCase(), options.url, options.async || true, options.user || null, options.password || null);\n\n        /**\r\n         * Set headers, including shorthand for setting the Content-Type header.\r\n         */\n        if (typeof options.headers === 'undefined') options.headers = {\n            'Content-Type': 'application/x-www-form-urlencoded'\n        };\n        if (typeof options.contentType !== 'undefined') {\n            options.headers['Content-Type'] = options.contentType;\n        }\n        Object.keys(options.headers || {}).forEach(function (key) {\n            if (options.headers[key]) {\n                xhr.setRequestHeader(key, options.headers[key]);\n            }\n        });\n\n        /**\r\n         * If Content-Type is set to JSON, stringify data objects.\r\n         */\n        if (_typeof(options.data) == 'object' && /^application\\/json/.test(options.headers['Content-Type'])) {\n            options.data = JSON.stringify(options.data);\n        }\n\n        /**\r\n         * Convert data objects (except FormData) to &url=param strings.\r\n         * Currently this only works for single dimension objects.\r\n         */\n        else if (_typeof(options.data) == 'object' && !(options.data instanceof FormData)) {\n                options.data = Object.entries(options.data).map(function (_ref) {\n                    var _ref2 = _slicedToArray(_ref, 2),\n                        key = _ref2[0],\n                        value = _ref2[1];\n\n                    return encodeURIComponent(key) + '=' + encodeURIComponent(value);\n                }).join('&');\n            }\n        xhr.send(options.data || null);\n    });\n}\n\n//# sourceURL=webpack:///./src/assets/js/lib/ajax.js?");

/***/ }),

/***/ "./src/assets/sass/main.scss":
/*!***********************************!*\
  !*** ./src/assets/sass/main.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/assets/sass/main.scss?");

/***/ })

/******/ });