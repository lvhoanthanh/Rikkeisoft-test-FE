import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  mainWrapper: {
    height: '100vh',
    position: 'relative',
  },
  signInWrapper: {
    boxShadow: token.boxShadow,
    // borderRadius: token.borderRadius,
    padding: '2em',
    position: 'relative',
    zIndex: 1,
  },
  forgotLink: {
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  bgAbsolute: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(2px)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
}));
