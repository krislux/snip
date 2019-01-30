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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/js/app.js":
/*!**************************!*\
  !*** ./client/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-env browser */\n\nvar _ajax = __webpack_require__(/*! ./lib/ajax.js */ \"./client/js/lib/ajax.js\");\n\nvar _ajax2 = _interopRequireDefault(_ajax);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n__webpack_require__(/*! ../sass/main.scss */ \"./client/sass/main.scss\");\n\nvar types = ['html', 'css', 'javascript'];\nvar editors = {};\n\nvar backend = '//localhost:8222';\n\ntypes.forEach(function (type) {\n    /* global ace */\n    var editor = ace.edit('editor-' + type);\n    editor.setTheme('ace/theme/monokai');\n    editor.session.setMode('ace/mode/' + type);\n    editors[type] = editor;\n});\n\n[].forEach.call(document.querySelectorAll('.btn-save'), function ($el) {\n    $el.addEventListener('click', function () {\n\n        var data = {};\n        types.forEach(function (i) {\n            data[i] = editors[i].getValue();\n        });\n\n        (0, _ajax2.default)({\n            url: backend + '/save',\n            contentType: 'application/json',\n            method: 'post',\n            data: data\n        });\n    });\n});\n\n//# sourceURL=webpack:///./client/js/app.js?");

/***/ }),

/***/ "./client/js/lib/ajax.js":
/*!*******************************!*\
  !*** ./client/js/lib/ajax.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nexports.default = ajax;\n/**\n * Super simple AJAX Promise helper.\n * \n * @author  Kris Lux <mail@kilolima.dk>\n * @version 1.0\n * @license MIT\n */ /**\n    * Does not support Internet Explorer at all, as it doesn't support Promises.\n    * This can be fixed with a Promise polyfill.\n    * Support: Edge 12+, Firefox 29+, Chrome 33+, Safari 7.1+, Android 4.4.4+, iOS Safari 8+.\n    * \n    * Usage:\n    *      ajax('file.json').then(xhr => { ... });\n    * or\n    *      ajax({ url: 'file.json', method: 'post' }).then(xhr => { ... });\n    * \n    * @param   {(object|string)}   options               // If string this is the url, if object see below.\n    * @param   {string}   [options.method]               // HTTP method to use, defaults to GET.\n    * @param   {string}   [options.url]                  // Any valid url to call.\n    * @param   {(object|FormData|string)} [options.data] // Body data for POST etc.\n    * @param   {object}   [options.headers]              // Custom headers in {name:value} format.\n    * @param   {string}   [options.contentType]          // Shorthand for Content-Type header.\n    * @param   {boolean}  [options.async]                // Defaults to true, pass false to block execution.\n    * @param   {string}   [options.user]                 // Authentication username.\n    * @param   {string}   [options.password]             // Authentication password.\n    * \n    * @return  {Promise}  Arg is XmlHttpRequest with added properties responseJSON (if JSON).\n    */\nfunction ajax(options) {\n\n    if (typeof options === 'string') options = { url: options };\n\n    return new Promise(function (resolve, reject) {\n\n        var xhr = new XMLHttpRequest();\n\n        xhr.addEventListener('readystatechange', function () {\n            if (this.readyState === 4) {\n                if (this.status >= 200 && this.status <= 299) {\n                    if (this.getResponseHeader('Content-Type') == 'application/json') {\n                        this.responseJSON = JSON.parse(this.response);\n                    }\n                    resolve(this);\n                } else {\n                    reject(Error(this.statusText));\n                }\n            }\n        });\n\n        xhr.open((options.method || 'GET').toUpperCase(), options.url, options.async || true, options.user || null, options.password || null);\n\n        /**\n         * Set headers, including shorthand for setting the Content-Type header.\n         */\n        if (typeof options.headers === 'undefined') options.headers = {\n            'Content-Type': 'application/x-www-form-urlencoded'\n        };\n        if (typeof options.contentType !== 'undefined') {\n            options.headers['Content-Type'] = options.contentType;\n        }\n        Object.keys(options.headers || {}).forEach(function (key) {\n            if (options.headers[key]) {\n                xhr.setRequestHeader(key, options.headers[key]);\n            }\n        });\n\n        /**\n         * If Content-Type is set to JSON, stringify data objects.\n         */\n        if (_typeof(options.data) == 'object' && options.headers['Content-Type'] == 'application/json') {\n            options.data = JSON.stringify(options.data);\n        }\n\n        /**\n         * Convert data objects (except FormData) to &url=param strings.\n         * Currently this only works for single dimension objects.\n         */\n        else if (_typeof(options.data) == 'object' && !(options.data instanceof FormData)) {\n                options.data = Object.entries(options.data).map(function (_ref) {\n                    var _ref2 = _slicedToArray(_ref, 2),\n                        key = _ref2[0],\n                        value = _ref2[1];\n\n                    return encodeURIComponent(key) + '=' + encodeURIComponent(value);\n                }).join('&');\n            }\n        xhr.send(options.data || null);\n    });\n}\n\n//# sourceURL=webpack:///./client/js/lib/ajax.js?");

/***/ }),

/***/ "./client/sass/main.scss":
/*!*******************************!*\
  !*** ./client/sass/main.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./client/sass/main.scss?");

/***/ })

/******/ });