!function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,n){"use strict";var r=a(n(1)),o=a(n(3));function a(e){return e&&e.__esModule?e:{default:e}}n(4),window.editors={},window.backend="//"+location.hostname;var i,s=["html","css","javascript"];s.forEach(function(e){var t=ace.edit("editor-"+e,{theme:"ace/theme/monokai",mode:"ace/mode/"+e,showPrintMargin:!1,tabSize:2});editors[e]=t}),o.default.on(".btn-preview","click",function(){var t={},n=0;s.forEach(function(e){t[e]=editors[e].session.getValue(),n+=t[e].length});var o=document.getElementById("editor-preview");0===n?o.src="data:text/html;":r.default.preview(t,function(e){o.src="data:text/html;charset=UTF-8,"+encodeURIComponent(e.response)})}),o.default.on(".btn-save","click",function(e){var t=null;e.target.classList.contains("save-over")&&(t=o.default.getActiveId());var n={token:o.default.getToken(),view:document.body.className,id:t};s.forEach(function(e){n[e]=editors[e].session.getValue()}),r.default.save(n,function(e){history.pushState({id:e.responseJSON.id},null,"#/"+e.responseJSON.id),document.getElementById("editor-preview").src=backend+"/render/"+e.responseJSON.id})}),o.default.on(".btn-signout","click",function(){sessionStorage.removeItem("login_token"),localStorage.removeItem("login_token"),[].forEach.call(document.querySelectorAll(".menu-switcher"),function(e){e.classList.remove("authed")})}),o.default.on("#signin-form","submit",function(e){e.preventDefault(),sessionStorage.removeItem("login_token"),localStorage.removeItem("login_token");var t={username:document.getElementById("signin-username").value,password:document.getElementById("signin-password").value},n="on"==document.getElementById("signin-persistent").value;r.default.login(t,function(e){e.responseJSON&&(e.responseJSON.success?(n?localStorage.setItem("login_token",e.responseJSON.token):sessionStorage.setItem("login_token",e.responseJSON.token),[].forEach.call(document.querySelectorAll(".menu-switcher"),function(e){e.classList.add("authed")}),document.getElementById("signin-form").style.display="none"):alert(e.responseJSON.error))})}),o.default.on(".tab-container button","click",function(n){[].forEach.call(document.querySelectorAll(".tab-container button"),function(e){var t=document.getElementById("editor-"+e.value).parentElement;e.value==n.target.value?(t.classList.add("active"),e.classList.add("active"),editors[e.value]&&editors[e.value].resize()):(t.classList.remove("active"),e.classList.remove("active"))})}),o.default.on(".layout-switcher button","click",function(e){document.body.classList.remove("grid","tabbed"),document.body.classList.add(e.target.value),s.forEach(function(e){editors[e].resize()})}),o.default.on(".drop-down button","click",function(e){e.target.parentElement.parentElement.style.display="none"}),location.hash&&(i=o.default.getActiveId(),r.default.load(i,function(t){t.responseJSON&&t.responseJSON.success?(document.body.className=t.responseJSON.view,s.forEach(function(e){editors[e].session.setValue(t.responseJSON[e])}),document.getElementById("editor-preview").src=backend+"/render/"+i):alert("Error\n\nCouldn't load snip\n\n"+t.responseJSON.error)})),o.default.getToken()&&[].forEach.call(document.querySelectorAll(".menu-switcher"),function(e){e.classList.add("authed")})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var a,i=n(2),s=(a=i)&&a.__esModule?a:{default:a};var l=(o(c,null,[{key:"save",value:function(e,t){(0,s.default)({url:backend+"/save",contentType:"application/json",method:"post",data:e}).then(function(e){e.responseJSON&&e.responseJSON.success?t(e):alert("Error\n\n"+e.responseJSON.error)}).catch(function(e){alert(e.toString()+"\n\nUnable to save. Please try again or report the issue.")})}},{key:"preview",value:function(e,t){(0,s.default)({url:backend+"/preview",contentType:"application/json",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){alert(e.toString()+"\n\nUnable to render. Please try again or report the issue.")})}},{key:"load",value:function(e,t){(0,s.default)({url:backend+"/get/"+e,contentType:"application/json",method:"get"}).then(function(e){e.responseJSON&&t(e)}).catch(function(e){alert(e.toString()+"\n\nCould not contact server. Please try again later.")})}},{key:"login",value:function(e,t){(0,s.default)({url:backend+"/login",contentType:"application/json",method:"post",data:e}).then(function(e){e.responseJSON&&t(e)}).catch(function(e){alert(e.toString()+"\n\nCould not contact server. Please try again later.")})}}]),c);function c(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c)}t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&s.return&&s.return()}finally{if(r)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=
/**
 * Super simple AJAX Promise helper.
 * 
 * @author  Kris Lux <mail@kilolima.dk>
 * @version 1.0
 * @license MIT
 */
function(o){"string"==typeof o&&(o={url:o});return new Promise(function(e,t){var n=new XMLHttpRequest;n.addEventListener("readystatechange",function(){4===this.readyState&&(200<=this.status&&this.status<=299?(/^application\/json/.test(this.getResponseHeader("Content-Type"))&&(this.responseJSON=JSON.parse(this.response)),e(this)):t(Error(this.statusText)))}),n.open((o.method||"GET").toUpperCase(),o.url,o.async||!0,o.user||null,o.password||null),void 0===o.headers&&(o.headers={"Content-Type":"application/x-www-form-urlencoded"}),void 0!==o.contentType&&(o.headers["Content-Type"]=o.contentType),Object.keys(o.headers||{}).forEach(function(e){o.headers[e]&&n.setRequestHeader(e,o.headers[e])}),"object"==a(o.data)&&/^application\/json/.test(o.headers["Content-Type"])?o.data=JSON.stringify(o.data):"object"!=a(o.data)||o.data instanceof FormData||(o.data=Object.entries(o.data).map(function(e){var t=r(e,2),n=t[0],o=t[1];return encodeURIComponent(n)+"="+encodeURIComponent(o)}).join("&")),n.send(o.data||null)})}},function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0});var r=(function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}(a,null,[{key:"on",value:function(e,t,n){[].forEach.call(document.querySelectorAll(e),function(e){e.addEventListener(t,n)})}},{key:"getActiveId",value:function(){var e=location.hash.match(/#\/(\w{7})/);return e&&e[1]?e[1]:null}},{key:"getToken",value:function(){return localStorage.getItem("login_token")||sessionStorage.getItem("login_token")}}]),a);function a(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a)}(t.default=r).on(".toggle","click",function(e){for(var t=(t=e.target.getAttribute("data-target"))?document.querySelectorAll(t):[e.target.nextElementSibling],n=0;n<t.length;n++)"none"!=window.getComputedStyle(t[n]).display?t[n].style.display="none":t[n].style.display="block"})},function(e,t,n){}]);