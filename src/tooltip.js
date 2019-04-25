
const template = document.createElement('template');

template.innerHTML = `
<style>
  :host([disconnected]) {
    display: none;
  }
</style>
<slot></slot>
`;

class Tooltip extends HTMLElement{
  static get observedAttributes() {
    return ['text'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    
  }

  disconnectedCallback() {
   
  }
}

customElements.define('i-tooltip', Tooltip);