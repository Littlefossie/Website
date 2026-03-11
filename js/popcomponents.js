class popc extends HTMLElement {connectedCallback() {
const pei = this.getAttribute("pei");
const pen = this.getAttribute("pen");
const pet = this.getAttribute("pet");

const ifpei = pei ? `
  <div class="pophost" id="pex">
    <div class="extra">
      <img src="./images/mem/${pei}.gif" title="${pen}">
    </div>
`: `
  <div class="pophost"  id="pex" title="${pen}">
    <div class="extra">
      <h2>${pen}</h2>
    </div>
`;

const ifpe = pen ? `
  ${ifpei}
    <div class="popup">
      <div class="innercontainer">
        <p>${pet}</p> 
      </div>
    </div>
  </div>
`:'';

const pi = this.getAttribute("pi");
const pn = this.getAttribute("pn");
const pt = this.getAttribute("pt");

const ifpi = pi ? `
  <img src="./images/mem/${pi}.gif" title="${pn}">
`: `
  <h2>${pn}</h2>
`;

this.innerHTML = `
  <div class="pophost">
    ${ifpi}
    <div class="popup">
      <div class="innercontainer">
        <p>${pt}</p>
      </div>
      ${ifpe}
    </div> 
  </div>
`;
}}customElements.define("pop-c", popc);