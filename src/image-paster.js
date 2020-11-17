import constants from './constants';
import getClickWithinElement from './helpers/get-click-within-element';
// import preloadImage from './helpers/preload-image';
// import wait from './helpers/wait';
// import prepareCargoMediaSource from './helpers/prepare-cargo-media-source';
import template from './template';

class ImagePaster extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    // attach the created elements to the shadow DOM
    this.shadow.append(document.importNode(template.content, true));
    this.canvas = this.shadow.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.preview = this.shadow.querySelector('#next-photo-preview');
    this.gallery = this.previousElementSibling;

    this.bindMethods();
  }

  connectedCallback() {
    this.setCanvasSize();
    this.init();
  }

  disconnectedCallback() {
    this.canvas.removeEventListener('mousedown', this.handleMouseClick);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  bindMethods() {
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.init = this.init.bind(this);
  }

  setCanvasSize() {
    const { width, height } = this.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addRedRectagle(x, y, w = 10, h = 10) {
    this.context.fillStyle = 'red';
    this.context.fillRect(x, y, w, h);
  }

  addImage(img, x, y) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgX = x - imgWidth / 2;
    const imgY = y - imgHeight / 2;

    this.context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  }

  handleMouseMove(event) {
    const { x: posX, y: posY } = getClickWithinElement(event);
    const offset = 10;
    const x = posX + offset;
    const y = posY + offset;
    this.preview.setAttribute(
      'style',
      `transform: translate3d(${x}px, ${y}px, 0px); webkit-transform: translate3d(${x}px, ${y}px, 0px); moz-transform: translate3d(${x}px, ${y}px, 0px);`
    );
  }

  handleMouseClick(event) {
    const { x, y } = getClickWithinElement(event);

    this.addImage(this.getImage(), x, y);
    this.updatePreview();
  }

  init() {
    this.updateImages();

    this.updatePreview();
    // add event listeners to canvas
    this.canvas.addEventListener('mousedown', this.handleMouseClick);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  updateImages() {
    if (!this.gallery || !this.gallery.querySelectorAll) {
      throw new Error(
        'You should use image-paster only right after gallery block for proper initialization'
      );
    }

    this.images = [...this.gallery.querySelectorAll('img')].forEach((image) => {
      image.setAttribute('src', image.getAttribute('data-src'));
    });
  }

  updatePreview() {
    if (!this.images.length) {
      this.updateImages();
    }
    const nextImage = this.images[0];
    this.preview.setAttribute('src', nextImage.src);
  }

  getImage() {
    return this.images.shift();
  }
}

customElements.define(constants.CONTAINER_TAG, ImagePaster);
