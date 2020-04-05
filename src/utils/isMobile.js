
let md;

const isMobile = () => {
  if (!md) {
    md = new MobileDetect(window.navigator.userAgent);
  }
  return !!md.mobile();
};

export default isMobile;
