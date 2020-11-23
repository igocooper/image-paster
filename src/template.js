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
      width: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
    
    .mobile-tap-hint * {
      transform-origin: 50% 50%;
      perspective: 100px;
    }
    
    .hand-tap {
      fill: #fff;
      stroke: #000;
      stroke-width: 3px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  
    .tap-1 {
      fill: transparent;
      stroke: #000;
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

export default template;
