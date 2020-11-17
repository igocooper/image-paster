const prepareCargoMediaSource = (src, imgWidth) => src.replace('/t/original/', `/w/${imgWidth}/q/75/`);

export default prepareCargoMediaSource;
