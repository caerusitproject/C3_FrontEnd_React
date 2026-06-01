import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export const useDevice = () => {
  const getDeviceInfo = () => {
    const width = window.innerWidth;

    return {
      width,
      isMobile: width < MOBILE_BREAKPOINT,
      isTablet:
        width >= MOBILE_BREAKPOINT &&
        width < TABLET_BREAKPOINT,
      isDesktop: width >= TABLET_BREAKPOINT,
      deviceType:
        width < MOBILE_BREAKPOINT
          ? "mobile"
          : width < TABLET_BREAKPOINT
          ? "tablet"
          : "desktop",
    };
  };

  const [device, setDevice] = useState(getDeviceInfo);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceInfo());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
};