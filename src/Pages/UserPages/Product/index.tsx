import React, { useEffect } from 'react';
import _ from 'lodash';
import { Col } from 'antd';
import { ProductDataTableUser } from '@tables';
import { Helmet } from 'react-helmet';

const ProductsList: React.FC = () => {

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <Col>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <ProductDataTableUser />
    </Col>
  );
};

export default ProductsList;
