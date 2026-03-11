class isoc extends HTMLElement {connectedCallback() {
const ion = this.getAttribute("ion");
const iod = this.getAttribute("iod");

const ifo = ( ion || iod ) ?`
  <div class="iso-overlay">
    <p class="iso-name">${ion}</p>
    <p>${iod}</p>
    <p>tags</p>
  </div>
`:``;

const ii = this.getAttribute("ii");
const ie = this.getAttribute("ie");

const iv = ii ?`
  <img src="${ii}">
`:`
  ${ie}
`;

const ic = this.getAttribute("ic");
const it = this.getAttribute("it");
const id = this.getAttribute("id");

this.innerHTML = `
  <div class="item isoclass-${ic} ${it}" data-date="${id}">
    ${iv}
    ${ifo}
  </div>
`;
}}customElements.define("iso-c", isoc)