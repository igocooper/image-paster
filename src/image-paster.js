import constants from './constants';
import getClickWithinElement from './helpers/get-click-within-element';
import preloadImage from './helpers/preload-image';
import wait from './helpers/wait';
import prepareCargoMediaSource from './helpers/prepare-cargo-media-source';
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
    this.initImages = this.initImages.bind(this);
    this.reInitImages = this.reInitImages.bind(this);
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

  async init() {
    // timeout to not abuse call stack limit
    await wait(100);

    this.updateImages();
    const firstImage = this.images[0];
    const isImagesSizesReady = firstImage.width > 0;

    if (isImagesSizesReady) {
      // preload images and and store initial images for further usage
      this.initialImages = await this.initImages(this.images);

      this.reInitImages();
      this.updatePreview();
      // add event listeners to canvas
      this.canvas.addEventListener('mousedown', this.handleMouseClick);
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      return;
    }
    // Recursively load images till they will be rendered into DOM with actual size so we can read it using el.getBoundingClientRect()
    this.init();
  }

  updateImages() {
    if (!this.gallery || !this.gallery.querySelectorAll) {
      throw new Error(
        'You should use image-paster only right after gallery block for proper initialization'
      );
    }

    this.images = [...this.gallery.querySelectorAll('img')].map((image) => {
      const src = image.getAttribute('data-src');
      const { width, height } = image.getBoundingClientRect();
      return { width, height, src, element: image };
    });
  }

  async initImages(images) {
    if (!images) {
      throw new Error('Oops! Something went wrong, images were NOT collected 💩');
    }
    return Promise.all(
      images.map(async (image) => {
        const imgSrc = prepareCargoMediaSource({
          src: image.src,
        });

        return {
          ...image,
          src: imgSrc,
          'data-src': image.src,
        };
      })
    );
  }

  reInitImages() {
    this.images = [...this.initialImages];

  }

  updatePreview() {
    if (!this.images.length) {
      this.reInitImages();
    }
    const nextImage = this.images[0];
    this.preview.setAttribute('src', nextImage.src);
  }

  getImage() {
    return this.images.shift().element;
  }
}

customElements.define(constants.CONTAINER_TAG, ImagePaster);
