const isInsideEditor = () => {
  return document.className.includes('admin-wrapper');
};

export default isInsideEditor;
