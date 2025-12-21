class popc extends HTMLElement {connectedCallback() {
const pi = this.getAttribute("pi");
const pn = this.getAttribute("pn");
const pt = this.getAttribute("pt");
    const pei = this.getAttribute("pei");
    const pen = this.getAttribute("pen");
    const pet = this.getAttribute("pet");
    const pe = pei ?`
        <div class="pophost" style="width:80%;height:80%"><div class="extra">
            <img src="./images/mem/${pei}.gif" title="${pen}"></div>
                <div class="popup"><div class="innercontainer">
                    <p>${pet}</p>
        </div></div></div>`:'';
this.innerHTML = `
    <div class="pophost">
        <img src="./images/mem/${pi}.gif" title="${pn}">
        <div class="popup"><div class="innercontainer">
            <p>${pt}</p>
        </div>
            ${pe}
    </div></div>`;
}}customElements.define("pop-c", popc);