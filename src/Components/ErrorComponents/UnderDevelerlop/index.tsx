import React from 'react';
import _ from 'lodash';
import { Flex } from 'antd';
import { motion } from 'framer-motion';
import deniedSrc from '@assets/Images/underDeverlop.jpg';
const UnderDeverlop: React.FC = () => {
  return (
    <Flex align="center" justify="center" vertical>
      <motion.img
        src={deniedSrc}
        alt="logo"
        style={{
          width: 500,
          objectFit: 'contain',
        }}
      />
    </Flex>
  );
};

export default UnderDeverlop;
