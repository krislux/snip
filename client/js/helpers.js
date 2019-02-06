/* eslint-env browser */
export default class $ {
    static on(query, event, callback) {
        [].forEach.call(document.querySelectorAll(query), el => {
            el.addEventListener(event, callback);
        });
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
