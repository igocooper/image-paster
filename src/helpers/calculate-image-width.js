const calculateImageWidth = (galleryNode, widthInPercent) => {
  // we remove gallery left and right padding  from it's width to get precise result
  const galleryStyles = window.getComputedStyle(galleryNode);
  const galleryPadding = Number.parseFloat(galleryStyles.padding);
  const galleryWidth = Number.parseFloat(galleryStyles.width) - galleryPadding * 2;

  return galleryWidth / 100 * widthInPercent;
};

export default calculateImageWidth;
