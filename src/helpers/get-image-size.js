const getImageSize = (src) =>
  new Promise((res) => {
    const newImg = new Image();

    const onImgLoad = () => {
      const { height, width } = newImg;
      res({ width, height });
      console.log('loaded: ', src);
      newImg.removeEventListener('load', onImgLoad);
    };

    newImg.addEventListener('load', onImgLoad);
    newImg.src = src;
  });

export default getImageSize;