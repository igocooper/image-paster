const prepareCargoMediaSource = ({ src, imgWidth}) => {
  const width = (imgWidth * 2).toFixed();

  return src.replace('/t/original/', `/w/${width}/q/75/`);
};

export default prepareCargoMediaSource;
