import React, { useEffect } from 'react';
import _ from 'lodash';
import {
  Divider,
  Row,
} from 'antd';
import { Helmet } from 'react-helmet';
import {
  AuthActions,
} from '@actions';

const { } = AuthActions;

const Dashboard: React.FC = () => {
  
  useEffect(() => {
   
  }, []);

  return (
    <Row gutter={[20, 10]}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Divider orientation="left" style={{ fontSize: 20 }}>
        Dashboard
      </Divider>
    </Row>
  );
};

export default Dashboard;
