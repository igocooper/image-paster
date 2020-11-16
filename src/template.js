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
  </style>
  <img id="next-photo-preview" />
  <canvas id="canvas"></canvas>
`;

export default template;
