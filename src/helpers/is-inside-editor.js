const isInsideEditor = () => {
  return document.documentElement.className.includes('admin-wrapper');
};

export default isInsideEditor;
