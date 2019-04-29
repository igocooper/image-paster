const template = document.createElement('template');
const DEFAULT_TOOLTIP_POSITION = 'top';
const MAX_TOOLTIP_WIDTH = 180;
const LETTER_PIXEL_VALUE = 7;

template.innerHTML = `
<style>
  :host {
    position: relative;
  }

  .tooltip {
    visibility: hidden;
    position: absolute;

    background: rgba(0,0,0, .8);
    border-radius: 6px;
    padding: 5px 10px;
    text-align: center;
    color: #fff;
  }

  .tooltip.active {
    visibility: visible;
  }

  .tooltip.top {
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  .tooltip.bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
  }

  .tooltip.left {
    top: 50%;
    left: 0;
    transform: translateX(calc(-100% - 5px)) translateY(-50%);
  }

  .tooltip.right {
    top: 50%;
    right: 0;
    transform: translateX(calc(100% + 5px)) translateY(-50%);
  }

  /* POINTING */

  .tooltip.pointing.top {
    transform: translate(-50%, calc(-100% - 10px));
  }

  .tooltip.pointing.bottom {
    transform: translate(-50%, calc(100% + 10px));
  }

  .tooltip.pointing.left {
    transform: translateX(calc(-100% - 10px)) translateY(-50%);
  }

  .tooltip.pointing.right {
    transform: translateX(calc(100% + 10px)) translateY(-50%);
  }
  
  .pointing::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
  }

  .pointing.top::before {
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: rgba(0,0,0, .8) transparent transparent transparent;

    bottom: 0;
    left: 50%;
    transform: translate(-50%, 98%);
  }

  .pointing.bottom::before {
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent rgba(0,0,0, .8) transparent;

    top: 0;
    left: 50%;
    transform: translate(-50%, -98%);
  }

  .pointing.right::before {
    border-style: solid;
    border-width: 5px 5px 5px 0;
    border-color: transparent rgba(0,0,0, .8) transparent transparent;

    top: 50%;
    left: 0;
    transform: translate(-98%, -50%);
  }

  .pointing.left::before {
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent rgba(0,0,0, .8);

    top: 50%;
    right: 0;
    transform: translate(98%, -50%);
  }

</style>
<slot></slot>
<div class="tooltip"></div>
`;

class Tooltip extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'position'];
  }

  constructor() {
    super();
    // initialize tooltip
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this._tooltip = this.shadowRoot.querySelector('.tooltip');

    // bind evend handlers
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  connectedCallback() {
    this._tooltip.textContent = this.getAttribute('text');
    this._tooltip.classList.add(this.getAttribute('position') || DEFAULT_TOOLTIP_POSITION);
    const isPointing = this.hasAttribute('pointing');

    if (isPointing) {
      this._tooltip.classList.add('pointing');
    }

    this.addEventListener('mouseenter', this._onMouseEnter);
    this.addEventListener('mouseleave', this._onMouseLeave);
  }

  disconnectedCallback() {
    this.removeEventListener(this._onMouseEnter);
    this.removeEventListener(this._onMouseLeave);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text' && oldValue !== newValue) {
      this._tooltip.textContent = newValue;
      this._tooltip.style.width = this._calculateOptimalTooltipWidth(newValue);
    }
    if (name === 'position' && oldValue !== newValue) {
      this._tooltip.classList.add(newValue);
      this._tooltip.classList.remove(oldValue);
    }
  }

  _calculateOptimalTooltipWidth(tooltipText) {
    if (tooltipText.length * LETTER_PIXEL_VALUE < MAX_TOOLTIP_WIDTH) {
      return `${tooltipText.length * LETTER_PIXEL_VALUE}px`;
    }
    return `${MAX_TOOLTIP_WIDTH}px`;
  }

  _onMouseEnter() {
    this._tooltip.classList.add('active');
  }
  _onMouseLeave() {
    this._tooltip.classList.remove('active');
  }
}

customElements.define('i-tooltip', Tooltip);
