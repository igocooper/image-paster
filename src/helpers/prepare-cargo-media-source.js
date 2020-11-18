const prepareCargoMediaSource = ({ src, imgWidth, originalImgWidth }) => {
  const width =
    imgWidth !== originalImgWidth && imgWidth * 2 < originalImgWidth
      ? imgWidth * 2
      : originalImgWidth;

  return src.replace('/t/original/', `/w/${width.toFixed()}/q/75/`);
};

export default prepareCargoMediaSource;
