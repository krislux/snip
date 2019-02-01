/* eslint-env browser */
/* global editors */
export default class Shadow {
    constructor(element) {
        this.shadow = element.attachShadow({mode: 'closed'});
        
        this.style = document.createElement('style');
        this.body = document.createElement('body');
        this.script = document.createElement('script');

        this.shadow.appendChild(this.style);
        this.shadow.appendChild(this.body);
        this.body.appendChild(this.script);

    }
    
    update() {
        this.body.innerHTML = editors.html.session.getValue();
        this.style.innerHTML = editors.css.session.getValue();
        
        this.script.textContent = editors.javascript.session.getValue();
        this.body.appendChild(this.script);
    }
}
