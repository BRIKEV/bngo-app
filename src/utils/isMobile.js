
let md;

const isMobile = () => {
  if (!md) {
    md = new MobileDetect(window.navigator.userAgent);
  }
  return !!md.mobile() && !md.tablet();
};

export default isMobile;
