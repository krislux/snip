/* eslint-env browser */
export default class $ {
    static on(query, event, callback) {
        [].forEach.call(document.querySelectorAll(query), el => {
            el.addEventListener(event, callback);
        });
    }

    static getActiveId() {
        let m = location.hash.match(/#\/(\w{7})/);
        return (m && m[1]) ? m[1] : null;
    }

    static getToken() {
        return localStorage.getItem('login_token') || sessionStorage.getItem('login_token');
    }
}

$.on('.toggle', 'click', event => {
    let targets = event.target.getAttribute('data-target');
    if (targets) {
        targets = document.querySelectorAll(targets);
    }
    else {
        targets = [event.target.nextElementSibling];
    }

    for (let i = 0; i < targets.length; i++) {
        if (window.getComputedStyle(targets[i]).display != 'none') {
            targets[i].style.display = 'none';
        }
        else {
            targets[i].style.display = 'block';
        }
    }
});
