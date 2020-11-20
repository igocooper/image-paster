const isInsideEditor = () => {
  if (window.location !== window.parent.location) {
    const parentDocument = window.parent.document.documentElement;
    return parentDocument.className.includes('admin-wrapper');
  } else {
    return false;
  }
};

export default isInsideEditor;
