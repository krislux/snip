/* eslint-env browser */
export default class $ {
    static on(query, event, callback) {
        [].forEach.call(document.querySelectorAll(query), el => {
            el.addEventListener(event, callback);
        });
    }
}
