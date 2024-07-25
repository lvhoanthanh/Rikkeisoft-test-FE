import { createStyles } from 'antd-style';

const useButtonBgColor = createStyles(({ token }) => ({
  greenBtn: {
    background: token.green6,
    '&:hover': {
      background: `${token.green5} !important`,
    },
  },
  orangeBtn: {
    background: token.orange6,
    ':hover': {
      background: `${token.orange5} !important`,
    },
  },
  goldBtn: {
    background: token.gold6,
    ':hover': {
      background: `${token.gold5} !important`,
    },
  },
  purpleBtn: {
    background: token.purple6,
    ':hover': {
      background: `${token.purple5} !important`,
    },
  },
  darkPurpleBtn: {
    background: '#40009A',
    ':hover': {
      background: `${token.purple7} !important`,
    },
  },
  geekblueBtn: {
    background: token.geekblue6,
    ':hover': {
      background: `${token.geekblue4} !important`,
    },
  },
  magentaBtn: {
    background: token.magenta6,
    ':hover': {
      background: `${token.magenta5} !important`,
    },
  },
  cyanBtn: {
    background: token.cyan6,
    ':hover': {
      background: `${token.cyan5} !important`,
    },
  },
  yellowBtn: {
    background: token.yellow6,
    ':hover': {
      background: `${token.yellow5} !important`,
    },
  },
  volcanoBtn: {
    background: token.volcano6,
    ':hover': {
      background: `${token.volcano5} !important`,
    },
  },
  activeSwitchBtn: {
    '&.ant-switch.ant-switch-checked': {
      background: token.green6,
      ':hover': {
        background: `${token.green5} !important`,
      },
    },
  },
  deletedSwitchBtn: {
    '&.ant-switch.ant-switch-checked': {
      background: token.red6,
      ':hover': {
        background: `${token.red5} !important`,
      },
    },
  },
  purpleSwitchBtn: {
    '&.ant-switch.ant-switch-checked': {
      background: token.purple5,
      ':hover': {
        background: `${token.purple7} !important`,
      },
    },
  },
  gradientTitle: {
    backgroundImage:
      'linear-gradient(90deg, rgba(232,120,68,1) 0%, rgba(248,251,254,1) 35%, rgba(103,84,226,1) 100%)',
    backgroundSize: '200% auto',
    fontSize: '3rem',
    fontWeight: 600,
    color: ' #fff',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    animation: 'textclip 2s linear infinite',
    '@keyframes textclip': {
      to: {
        backgroundPosition: '200% center',
      },
    },
  },
  promotionTitle: {
    backgroundImage:
      'linear-gradient(90deg, rgba(232,197,68,1) 0%, rgba(236,31,21,1) 35%, rgba(160,84,226,1) 100%)',
    backgroundSize: '200% auto',
    fontSize: 21,
    fontWeight: 600,
    color: ' #fff',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    animation: 'textclip 2s linear infinite',
    '@keyframes textclip': {
      to: {
        backgroundPosition: '200% center',
      },
    },
  },
}));

export default { useButtonBgColor };
