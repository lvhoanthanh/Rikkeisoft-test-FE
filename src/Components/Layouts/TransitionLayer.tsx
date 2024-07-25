import React from 'react';
import { motion } from 'framer-motion';

interface IProps {
  children?: React.JSX.Element | React.JSX.Element[];
  style?: React.CSSProperties;
}

const TransitionLayer: React.FC<IProps> = ({ children, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all ease 0.25s',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionLayer;
