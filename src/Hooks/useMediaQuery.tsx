import { useMediaQuery } from 'react-responsive';

const UseMediaQuery = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMobileLandscape = useMediaQuery({
    query: '(max-width: 1224px) and (orientation: landscape)',
  });
  const isSmallLaptop = useMediaQuery({
    minDeviceWidth: 1280,
    maxDeviceWidth: 1366,
  });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const isTablet = useMediaQuery({
    query:
      'only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait), only screen and (min-device-width: 768px) and (max-device-width: 1366px) and (orientation: landscape)',
  });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
    isSmallLaptop,
    isMobile,
    isMobileLandscape,
    isTablet,
  };
};

export default UseMediaQuery;
