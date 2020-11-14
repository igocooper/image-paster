import constants from "./constants";
import getClickWithinElement from "./helpers/get-click-within-element";
import template from "./template";

class ImagePaster extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'
    // attach the created elements to the shadow DOM
    this.shadow.append(document.importNode(template.content, true));
    this.canvas = this.shadow.querySelector("#canvas");
    this.context = this.canvas.getContext("2d");
    this.preview = this.shadow.querySelector("#next-photo-preview");

    this.bindMethods();
  }

  connectedCallback() {
    this.canvas.addEventListener("mousedown", this.handleMouseClick);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);

    this.setCanvasSize();
    // defer updating images so it's loaded fully into light dom
    setTimeout(() => {
      this.updateImages();
      this.updatePreview();
    }, 4);
  }

  disconnectedCallback() {
    this.canvas.removeEventListener("mousedown", this.handleMouseClick);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }

  bindMethods() {
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.updateImages = this.updateImages.bind(this);
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
    this.context.fillStyle = "red";
    this.context.fillRect(x, y, w, h);
  }

  addImage(img, x, y) {
    const imgWidth = img.width;
    const imgHeight = img.height;
    console.log("w", imgWidth);
    console.log("h", imgHeight);
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
      "style",
      `transform: translate3d(${x}px, ${y}px, 0px); webkit-transform: translate3d(${x}px, ${y}px, 0px); moz-transform: translate3d(${x}px, ${y}px, 0px);`
    );
  }

  handleMouseClick(event) {
    const { x, y } = getClickWithinElement(event);

    this.addImage(this.getImage(), x, y);
    this.updatePreview();
  }

  updateImages() {
    this.images = [...this.previousElementSibling.querySelectorAll("img")].map(
      (image) => {
        const src = image.getAttribute("src");
        const { width, height } = image.getBoundingClientRect();
        return { width, height, src, element: image };
      }
    );
  }

  updatePreview() {
    if (!this.images.length) {
      this.updateImages();
    }
    const nextImage = this.images[0];
    this.preview.setAttribute("src", nextImage.src);
  }

  getImage() {
    return this.images.shift().element;
  }
}

customElements.define(constants.CONTAINER_TAG, ImagePaster);
