import React from 'react';
import _ from 'lodash';
import { Flex, Empty } from 'antd';
import notFoundSrc from '@assets/Images/notFound.jpeg';

const EmptyTable: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ padding: '2em', height: '100%', marginBottom: '1em' }}
    >
      <Empty image={notFoundSrc} />
    </Flex>
  );
};

export default EmptyTable;
