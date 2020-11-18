const preloadImage= (src, width, height) =>
  new Promise((res) => {
    const newImg = new Image(width, height);

    const onImgLoad = () => {
      res(newImg);
      newImg.removeEventListener('load', onImgLoad);
    };

    newImg.addEventListener('load', onImgLoad);
    newImg.src = src;
  });

export default preloadImage;
