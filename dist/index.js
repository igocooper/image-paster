/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./constants/index.js":
/*!****************************!*\
  !*** ./constants/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  CONTAINER_TAG: "image-paster"
};

/***/ }),

/***/ "./helpers/calculate-image-width.js":
/*!******************************************!*\
  !*** ./helpers/calculate-image-width.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const calculateImageWidth = (galleryNode, widthInPercent) => {
  // we remove gallery left and right padding  from it's width to get precise result
  const galleryStyles = window.getComputedStyle(galleryNode);
  const galleryPadding = Number.parseFloat(galleryStyles.padding);
  const galleryWidth = Number.parseFloat(galleryStyles.width) - galleryPadding * 2;

  return galleryWidth / 100 * widthInPercent;
};

exports.default = calculateImageWidth;

/***/ }),

/***/ "./helpers/get-click-within-element.js":
/*!*********************************************!*\
  !*** ./helpers/get-click-within-element.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const getClickWithinElement = event => {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
};

exports.default = getClickWithinElement;

/***/ }),

/***/ "./helpers/get-same-ratio-height-from-width.js":
/*!*****************************************************!*\
  !*** ./helpers/get-same-ratio-height-from-width.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const getSameRatioHeightFromWidth = (width, originalWidth, originalHeight) => originalHeight / originalWidth * width;

exports.default = getSameRatioHeightFromWidth;

/***/ }),

/***/ "./helpers/is-inside-editor.js":
/*!*************************************!*\
  !*** ./helpers/is-inside-editor.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const isInsideEditor = () => {
  if (window.location !== window.parent.location) {
    const parentDocument = window.parent.document.documentElement;
    return parentDocument.classList.contains('admin-wrapper');
  } else {
    return false;
  }
};

exports.default = isInsideEditor;

/***/ }),

/***/ "./helpers/is-touch-devices.js":
/*!*************************************!*\
  !*** ./helpers/is-touch-devices.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const isTouchDevice = () => 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

exports.default = isTouchDevice;

/***/ }),

/***/ "./helpers/preload-image.js":
/*!**********************************!*\
  !*** ./helpers/preload-image.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const preloadImage = (src, width, height) => new Promise(res => {
  const newImg = new Image(width, height);

  const onImgLoad = () => {
    res(newImg);
    newImg.removeEventListener('load', onImgLoad);
  };

  newImg.addEventListener('load', onImgLoad);
  newImg.src = src;
});

exports.default = preloadImage;

/***/ }),

/***/ "./helpers/prepare-cargo-media-source.js":
/*!***********************************************!*\
  !*** ./helpers/prepare-cargo-media-source.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const prepareCargoMediaSource = ({ src, imgWidth, originalImgWidth }) => {
  const width = imgWidth !== originalImgWidth && imgWidth * 2 < originalImgWidth ? imgWidth * 2 : originalImgWidth;

  return src.replace('/t/original/', `/w/${width.toFixed()}/q/75/`);
};

exports.default = prepareCargoMediaSource;

/***/ }),

/***/ "./helpers/wait.js":
/*!*************************!*\
  !*** ./helpers/wait.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const wait = timer => new Promise(res => {
  setTimeout(() => {
    res();
  }, timer);
});

exports.default = wait;

/***/ }),

/***/ "./image-paster.js":
/*!*************************!*\
  !*** ./image-paster.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(/*! ./constants */ "./constants/index.js");

var _constants2 = _interopRequireDefault(_constants);

var _getClickWithinElement = __webpack_require__(/*! ./helpers/get-click-within-element */ "./helpers/get-click-within-element.js");

var _getClickWithinElement2 = _interopRequireDefault(_getClickWithinElement);

var _preloadImage = __webpack_require__(/*! ./helpers/preload-image */ "./helpers/preload-image.js");

var _preloadImage2 = _interopRequireDefault(_preloadImage);

var _wait = __webpack_require__(/*! ./helpers/wait */ "./helpers/wait.js");

var _wait2 = _interopRequireDefault(_wait);

var _prepareCargoMediaSource = __webpack_require__(/*! ./helpers/prepare-cargo-media-source */ "./helpers/prepare-cargo-media-source.js");

var _prepareCargoMediaSource2 = _interopRequireDefault(_prepareCargoMediaSource);

var _isInsideEditor = __webpack_require__(/*! ./helpers/is-inside-editor */ "./helpers/is-inside-editor.js");

var _isInsideEditor2 = _interopRequireDefault(_isInsideEditor);

var _isTouchDevices = __webpack_require__(/*! ./helpers/is-touch-devices */ "./helpers/is-touch-devices.js");

var _isTouchDevices2 = _interopRequireDefault(_isTouchDevices);

var _getSameRatioHeightFromWidth = __webpack_require__(/*! ./helpers/get-same-ratio-height-from-width */ "./helpers/get-same-ratio-height-from-width.js");

var _getSameRatioHeightFromWidth2 = _interopRequireDefault(_getSameRatioHeightFromWidth);

var _calculateImageWidth = __webpack_require__(/*! ./helpers/calculate-image-width */ "./helpers/calculate-image-width.js");

var _calculateImageWidth2 = _interopRequireDefault(_calculateImageWidth);

var _template = __webpack_require__(/*! ./template */ "./template.js");

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class ImagePaster extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    // attach the created elements to the shadow DOM
    this.shadow.append(document.importNode(_template2.default.content, true));
    this.canvas = this.shadow.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.preview = this.shadow.querySelector('#next-photo-preview');
    this.mobileHint = this.shadow.querySelector('.mobile-tap-hint');

    this.bindMethods();
  }

  connectedCallback() {
    this.loopEnabled = this.dataset.loop !== 'false';
    this.cropEnabled = this.dataset.crop !== 'false';
    if ((0, _isTouchDevices2.default)()) {
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
    var _getBoundingClientRec = this.getBoundingClientRect();

    const width = _getBoundingClientRec.width,
          height = _getBoundingClientRec.height;

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
        y: imgY
      };
    }

    const x = Math.min(canvasWidth - imgWidth, Math.max(imgX, 0));
    const y = Math.min(canvasHeight - imgHeight, Math.max(imgY, 0));
    return {
      x,
      y
    };
  }

  addImage(img, clientX, clientY) {
    const imgWidth = img.width;
    const imgHeight = img.height;

    var _calculateImagePositi = this.calculateImagePosition({ imgWidth, imgHeight, clientX, clientY });

    const x = _calculateImagePositi.x,
          y = _calculateImagePositi.y;


    this.context.drawImage(img, x, y, imgWidth, imgHeight);
  }

  handleMouseMove(event) {
    var _getClickWithinElemen = (0, _getClickWithinElement2.default)(event);

    const posX = _getClickWithinElemen.x,
          posY = _getClickWithinElemen.y;

    const offset = 10;
    const x = posX + offset;
    const y = posY + offset;
    this.preview.setAttribute('style', `transform: translate3d(${x}px, ${y}px, 0px); webkit-transform: translate3d(${x}px, ${y}px, 0px); moz-transform: translate3d(${x}px, ${y}px, 0px);`);
  }

  handleMouseClick(event) {
    this.hideMobileHint();

    var _getClickWithinElemen2 = (0, _getClickWithinElement2.default)(event);

    const x = _getClickWithinElemen2.x,
          y = _getClickWithinElemen2.y;


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

  handleOrientationChange(e) {
    // we don't care about orientation but just in case we can use those
    // if (e.matches) {
    //   // portrait
    // } else {
    //   // landscape
    // }
    this.clearCanvas();
    this.setCanvasSize();
  }

  hideMobileHint() {
    if (!this.mobileHint.classList.contains('hidden')) {
      this.mobileHint.classList.add('hidden');
    }
  }

  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // timeout to not abuse call stack limit
      yield (0, _wait2.default)(100);

      const isGalleryInitialized = _this.previousElementSibling && _this.previousElementSibling.className.includes('initialized');

      if (isGalleryInitialized) {
        _this.gallery = _this.previousElementSibling;
        if (!(0, _isInsideEditor2.default)()) {
          _this.hideGallery();
        }
        const imagesFromDom = _this.getImagesFromDom();
        // preload images and and store initial images for further usage
        _this.initialImages = yield _this.initImages(imagesFromDom);

        _this.reInitImages();
        _this.updatePreview();
        // add event listeners to canvas
        _this.canvas.addEventListener('mousedown', _this.handleMouseClick);
        _this.canvas.addEventListener('mousemove', _this.handleMouseMove);
        _this.orientation = window.matchMedia('(orientation: portrait)');
        _this.orientation.addListener(_this.handleOrientationChange);
        return;
      }
      // Recursively wait till gallery is initialized
      _this.init();
    })();
  }

  getImagesFromDom() {
    if (!this.gallery || !this.gallery.querySelectorAll) {
      throw new Error('You should use image-paster only right after gallery block for proper initialization');
    }

    return [...this.gallery.querySelectorAll('img')];
  }

  initImages(images) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!images) {
        throw new Error('Oops! Something went wrong, images were NOT collected 💩');
      }

      const preparedImagesData = _this2.prepareImagesData(images);

      return Promise.all(preparedImagesData.map((() => {
        var _ref = _asyncToGenerator(function* (image) {
          const imgSrc = (0, _prepareCargoMediaSource2.default)({
            src: image.src,
            imgWidth: image.width,
            originalImgWidth: image.originalImgWidth
          });

          const imageElement = yield (0, _preloadImage2.default)(imgSrc, image.width, image.height);
          return _extends({}, image, {
            src: imgSrc,
            element: imageElement
          });
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })()));
    })();
  }

  prepareImagesData(images) {
    if (!this.gallery) {
      throw new Error('You should use prepare image data only right after gallery block proper initialization');
    }
    const metaRaw = JSON.parse(this.gallery.getAttribute('data-gallery'));
    const galleryMetaData = metaRaw.data['meta_data'];

    return images.map((image, index) => {
      const imageWidthInPercents = galleryMetaData[index].width;
      const width = (0, _calculateImageWidth2.default)(this.gallery, imageWidthInPercents);
      const originalImgHeight = Number.parseInt(image.getAttribute('height'));
      const originalImgWidth = Number.parseInt(image.getAttribute('width'));
      const height = (0, _getSameRatioHeightFromWidth2.default)(width, originalImgWidth, originalImgHeight);
      const src = image.getAttribute('data-src');

      return {
        originalImgWidth,
        originalImgHeight,
        width,
        height,
        src
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

customElements.define(_constants2.default.CONTAINER_TAG, ImagePaster);

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./image-paster */ "./image-paster.js");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const template = document.createElement("template");

template.innerHTML = `
<style>  
    html, body {
      margin: 0;
      padding: 0;
    }

    :host {
      position: relative;
      display: block;
      width: 100vw;
      height: 100vh;
    }

    :host(:hover) #next-photo-preview {
        opacity: 1;
    }
    
    :host(:hover) #next-photo-preview.hidden {
      opacity: 0;
    }
    
    #canvas {
      cursor: pointer;
    }

    #next-photo-preview {
      position: absolute;
      color: red;
      transition: translate3d 0.5s;
      will-change: transform;
      pointer-events: none;
      max-width: 150px;
      opacity: 0;
    }
    
    
   .mobile-tap-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--mobile-tap-hint-width, 50%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      display: none;
    }
    
    .mobile-tap-hint * {
      transform-origin: 50% 50%;
      perspective: 100px;
    }
    
    .hand-tap {
      fill: var(--mobile-tap-hand-fill, #fff);
      stroke: var(--mobile-tap-hand-stroke, #000);
      stroke-width: 3px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  
    .tap-1 {
      fill: transparent;
      stroke: var(--mobile-tap-stroke, #000);
      stroke-width: 3px;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: .5;
    }
    
    
  
    @keyframes tap {
      0% {
        transform: rotateX(0deg);
      }
      10% {
        transform: rotateX(12.5deg);
      }
      25% {
        transform: rotateX(25deg);
      }
    }
    
    @keyframes tap-circle {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      75% {
        transform: scale(1.05);
        opacity: .6;
      }
      80% {
        transform: scale(1);
        opacity: .5;
      }
    }
     
    :host(.touch) #next-photo-preview {
        visibility: hidden;
      }
      
    :host(.touch) .mobile-tap-hint {
      display: block;
    }
    
    :host(.touch) .hand-tap {
      animation: tap 1.25s ease-out backwards;
      animation-iteration-count:infinite;
    }
    
    :host(.touch) .tap-1 {
      animation: tap-circle 1.25s ease-out backwards;
      animation-iteration-count:infinite;
    }
    
    :host(.touch) .mobile-tap-hint.hidden {
      display: none;
      animation: none;
    }
    
    :host(.touch) .mobile-tap-hint.hidden .hand-tap,
    :host(.touch) .mobile-tap-hint.hidden .tap-1 {
      animation: none;
    }
  </style>
  <img id="next-photo-preview" />
  <svg class="mobile-tap-hint" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle class="tap-1" cx="89.43" cy="64.48" r="19.46"/>
    <path class="hand-tap" d="M139.93,102.68,98.81,95.75V65.2A9.25,9.25,0,0,0,89.56,56h0a9.25,9.25,0,0,0-9.25,9.25v57.36L71,111.77c-3.61-3.61-8.44-3.89-13.08,0,0,0-7.24,5.84-3.83,9.25l34,34h42.63a9.25,9.25,0,0,0,9.07-7.43l6.82-34.09A9.28,9.28,0,0,0,139.93,102.68Z"/>
  </svg>
  <canvas id="canvas"></canvas>
`;

exports.default = template;

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map