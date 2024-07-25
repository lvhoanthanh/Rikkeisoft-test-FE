import React from 'react';
import _ from 'lodash';
import { Flex, Typography } from 'antd';
import { motion } from 'framer-motion';
import deniedSrc from '@assets/Gif/403.gif';
const PermissionDenied: React.FC = () => {
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
      <Typography.Text style={{ textAlign: 'center', fontSize: '2rem' }}>
        <b>We are sorry...</b>
      </Typography.Text>
      <Typography.Text style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        The page you're trying to access has restricted access.
        <br /> Please refer to your system administrator
      </Typography.Text>
    </Flex>
  );
};

export default PermissionDenied;
