import React, { useEffect } from 'react';
import _ from 'lodash';
import { Col } from 'antd';
import { CategoryDataTable } from '@tables';
import { Helmet } from 'react-helmet';

const CategoryList: React.FC = () => {

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <Col>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <CategoryDataTable />
    </Col>
  );
};

export default CategoryList;
