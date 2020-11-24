import constants from './constants';
import getClickWithinElement from './helpers/get-click-within-element';
import preloadImage from './helpers/preload-image';
import wait from './helpers/wait';
import prepareCargoMediaSource from './helpers/prepare-cargo-media-source';
import isInsideEditor from './helpers/is-inside-editor';
import isTouchDevice from './helpers/is-touch-devices';
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
    this.mobileHint = this.shadow.querySelector('.mobile-tap-hint');

    this.bindMethods();
  }

  connectedCallback() {
    this.loopEnabled = this.dataset.loop !== 'false';
    this.cropEnabled = this.dataset.crop !== 'false';
    if (isTouchDevice()) {
      this.classList.add('touch');
    }
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
    this.initImages = this.initImages.bind(this);
    this.reInitImages = this.reInitImages.bind(this);
    this.prepareImagesData = this.prepareImagesData.bind(this);
    this.hideGallery = this.hideGallery.bind(this);
    this.hideMobileHint = this.hideMobileHint.bind(this);
    this.calculateImagePosition = this.calculateImagePosition.bind(this);
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

  calculateImagePosition({ imgWidth, imgHeight, clientX, clientY }) {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const imgX = clientX - imgWidth / 2;
    const imgY = clientY - imgHeight / 2;
    if (this.cropEnabled) {
      return {
        x: imgX,
        y: imgY,
      };
    }

    const x = Math.min(canvasWidth - imgWidth, Math.max(imgX, 0));
    const y = Math.min(canvasHeight - imgHeight, Math.max(imgY, 0));
    return {
      x,
      y,
    };
  }

  addImage(img, clientX, clientY) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const { x, y } = this.calculateImagePosition({ imgWidth, imgHeight, clientX, clientY });

    this.context.drawImage(img, x, y, imgWidth, imgHeight);
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
    this.hideMobileHint();
    const { x, y } = getClickWithinElement(event);

    if (!this.images.length && !this.loopEnabled) {
      this.clearCanvas();
      this.reInitImages();
      this.updatePreview();
      return;
    }

    this.addImage(this.getImage(), x, y);
    if (!this.images.length && this.loopEnabled) {
      this.reInitImages();
    }
    this.updatePreview();
  }

  hideMobileHint() {
    if (!this.mobileHint.classList.contains('hidden')) {
      this.mobileHint.classList.add('hidden');
    }
  }

  async init() {
    // timeout to not abuse call stack limit
    await wait(100);

    const isGalleryInitialized =
      this.previousElementSibling && this.previousElementSibling.className.includes('initialized');

    if (isGalleryInitialized) {
      this.gallery = this.previousElementSibling;
      if (!isInsideEditor()) {
        this.hideGallery();
      }
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
      const height = getSameRatioHeightFromWidth(width, originalImgWidth, originalImgHeight);
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
    this.gallery.style = 'height: 0; opacity: 0; pointer-events: none; margin:0; padding:0;';
  }

  reInitImages() {
    this.images = [...this.initialImages];
  }

  updatePreview() {
    const nextImage = this.images[0];
    const imgSrc = nextImage && nextImage.src;
    if (!imgSrc) {
      this.preview.classList.add('hidden');
      return;
    }
    this.preview.classList.remove('hidden');
    this.preview.setAttribute('src', imgSrc);
  }

  getImage() {
    const nextImage = this.images.shift().element;
    return nextImage;
  }
}

customElements.define(constants.CONTAINER_TAG, ImagePaster);
