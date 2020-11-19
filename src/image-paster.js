import constants from './constants';
import getClickWithinElement from './helpers/get-click-within-element';
import preloadImage from './helpers/preload-image';
import wait from './helpers/wait';
import prepareCargoMediaSource from './helpers/prepare-cargo-media-source';
import isInsideEditor from './helpers/is-insed-editor';
import getSameRatioHeightFromWidth from './helpers/get-same-ratio-height-from-width';
import calculateImageWidth from './helpers/calculate-image-width';
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
    if (isInsideEditor()) {
      this.hideGallery();
    }
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
    this.initImages = this.initImages.bind(this);
    this.reInitImages = this.reInitImages.bind(this);
    this.prepareImagesData = this.prepareImagesData.bind(this);
    this.hideGallery = this.hideGallery.bind(this);
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

    const isGalleryInitialized = this.gallery.className.includes('initialized');

    if (isGalleryInitialized) {
      const imagesFromDom = this.getImagesFromDom();
      // preload images and and store initial images for further usage
      this.initialImages = await this.initImages(imagesFromDom);

      this.reInitImages();
      this.updatePreview();
      // add event listeners to canvas
      this.canvas.addEventListener('mousedown', this.handleMouseClick);
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      return;
    }
    // Recursively wait till gallery is initialized
    this.init();
  }

  getImagesFromDom() {
    if (!this.gallery || !this.gallery.querySelectorAll) {
      throw new Error(
        'You should use image-paster only right after gallery block for proper initialization'
      );
    }

    return [...this.gallery.querySelectorAll('img')];
  }

  async initImages(images) {
    if (!images) {
      throw new Error('Oops! Something went wrong, images were NOT collected 💩');
    }

    const preparedImagesData = this.prepareImagesData(images);

    return Promise.all(
      preparedImagesData.map(async (image) => {
        const imgSrc = prepareCargoMediaSource({
          src: image.src,
          imgWidth: image.width,
          originalImgWidth: image.originalImgWidth,
        });

        const imageElement = await preloadImage(imgSrc, image.width, image.height);
        return {
          ...image,
          src: imgSrc,
          element: imageElement,
        };
      })
    );
  }

  prepareImagesData(images) {
    if (!this.gallery) {
      throw new Error(
        'You should use prepare image data only right after gallery block proper initialization'
      );
    }
    const metaRaw = JSON.parse(this.gallery.getAttribute('data-gallery'));
    const galleryMetaData = metaRaw.data['meta_data'];

    return images.map((image, index) => {
      const imageWidthInPercents = galleryMetaData[index].width;
      const width = calculateImageWidth(this.gallery, imageWidthInPercents);
      const originalImgHeight = Number.parseInt(image.getAttribute('height'));
      const originalImgWidth = Number.parseInt(image.getAttribute('width'));
      const height = getSameRatioHeightFromWidth(
        width,
        originalImgWidth,
        originalImgHeight
      );
      const src = image.getAttribute('data-src');

      return {
        originalImgWidth,
        originalImgHeight,
        width,
        height,
        src,
      };
    });
  }

  hideGallery() {
    this.gallery.style = 'height: 0; opacity: 0; pointer-events: none;';
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
