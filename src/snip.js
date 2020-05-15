/* eslint-env browser */
module.exports = class Snip {
    /**
     * Draw the preview view from html, css and javascript data.
     */
    static render(html, css, javascript, callback) {
        require('fs').readFile('src/template.html', (err, data) => {
            let buffer = data.toString();
            if ( ! err) {
                buffer = buffer.replace('#html#', html);
                buffer = buffer.replace('#css#', css);
                buffer = buffer.replace('#javascript#', javascript);
                callback(buffer);
            }
        });
    }
};
