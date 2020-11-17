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

/***/ "./image-paster.js":
/*!*************************!*\
  !*** ./image-paster.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(/*! ./constants */ "./constants/index.js");

var _constants2 = _interopRequireDefault(_constants);

var _getClickWithinElement = __webpack_require__(/*! ./helpers/get-click-within-element */ "./helpers/get-click-within-element.js");

var _getClickWithinElement2 = _interopRequireDefault(_getClickWithinElement);

var _template = __webpack_require__(/*! ./template */ "./template.js");

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImagePaster extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    // attach the created elements to the shadow DOM
    this.shadow.append(document.importNode(_template2.default.content, true));
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

  addImage(img, x, y) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgX = x - imgWidth / 2;
    const imgY = y - imgHeight / 2;

    this.context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
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
    var _getClickWithinElemen2 = (0, _getClickWithinElement2.default)(event);

    const x = _getClickWithinElemen2.x,
          y = _getClickWithinElemen2.y;


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
      throw new Error('You should use image-paster only right after gallery block for proper initialization');
    }

    this.images = [...this.gallery.querySelectorAll('img')];
    this.images.forEach(image => {
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
// import preloadImage from './helpers/preload-image';
// import wait from './helpers/wait';
// import prepareCargoMediaSource from './helpers/prepare-cargo-media-source';


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

    #next-photo-preview {
      position: absolute;
      color: red;
      transition: translate3d 0.5s;
      will-change: transform;
      pointer-events: none;
      max-width: 150px;
      opacity: 0;
    }
    
    @media only screen and (max-device-width: 480px) {
      #next-photo-preview {
        visibility: hidden;
      }
    }
  </style>
  <img id="next-photo-preview" />
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