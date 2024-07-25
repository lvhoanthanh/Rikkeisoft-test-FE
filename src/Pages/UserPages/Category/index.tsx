import React, { useEffect } from 'react';
import _ from 'lodash';
import { Col } from 'antd';
import { CategoryDataTableUser } from '@tables';
import { Helmet } from 'react-helmet';

const CategoryList: React.FC = () => {

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <Col>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <CategoryDataTableUser />
    </Col>
  );
};

export default CategoryList;
