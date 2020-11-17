const preloadImage= (src) =>
  new Promise((res) => {
    const newImg = new Image();

    const onImgLoad = () => {
      res(newImg);
      newImg.removeEventListener('load', onImgLoad);
    };

    newImg.addEventListener('load', onImgLoad);
    newImg.src = src;
  });

export default preloadImage;
