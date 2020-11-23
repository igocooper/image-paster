const isTouchDevice = () => ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);

export default isTouchDevice;
