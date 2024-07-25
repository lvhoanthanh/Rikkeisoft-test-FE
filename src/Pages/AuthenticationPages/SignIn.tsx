import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Typography,
  Col,
  Row,
  Form,
  Input,
  Button,
} from 'antd';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';
import { UseMediaQuery } from '@hooks';
import { AuthActions } from '@actions';
import { RootState, useTypedDispatch } from '@store';
import AuthStyles from './Authentication.styles';
import { CommonStyles } from '@common';
import { Helmet } from 'react-helmet';

type FieldType = {
  account: string;
  password: string;
  rememberMe?: boolean;
};

const { login } = AuthActions;

const SignIn: React.FC = () => {
  const { styles } = AuthStyles();
  const btnStyles = CommonStyles.useButtonBgColor();
  const dispatch = useTypedDispatch();
  const { isTabletOrMobile } = UseMediaQuery();

  const isActionLoading: any = useSelector((state: RootState) =>
    _.get(state.AUTHENTICATION, 'isActionLoading'),
  );
  const [countDownSend, setCountDownSend] = useState(0);

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (countDownSend < 30 && countDownSend > 0) {
      setTimeout(() => {
        setCountDownSend(countDownSend - 1);
      }, 1000);
    } else setCountDownSend(0);
  }, [countDownSend]);

  const onLogin = (values: any) => dispatch(login(values));

  const loginForm = () => (
    <Form
      layout="vertical"
      name="signInForm"
      wrapperCol={{ span: 24 }}
      initialValues={{ rememberMe: true }}
      onFinish={onLogin}
      autoComplete="off"
      requiredMark="optional"
      style={{ maxWidth: 550 }}
    >
      <Form.Item>
        <Flex vertical justify="center" align="center">
          <Typography.Text style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            welcome
          </Typography.Text>
        </Flex>
      </Form.Item>
      <Form.Item<FieldType>
        label="E-mail"
        name="account"
        style={{ fontWeight: 600 }}
        rules={[
          {
            required: true,
            message: 'Email is required'
          },
          {
            type: 'email',
            message: 'Please check email'
          },
        ]}
      >
        <Input size="large" autoComplete="email" />
      </Form.Item>
      <Form.Item<FieldType>
        label={'password'}
        name="password"
        style={{ fontWeight: 600 }}
        rules={[
          { required: true, message: 'pasword is required' },
          { min: 6, message: 'Must be 6 characters or more' },
        ]}
      >
        <Row gutter={10}>
          <Col span={20}>
            <Input.Password size="large" autoComplete="username email" />
          </Col>
          <Col span={3}>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Button
                type="primary"
                loading={isActionLoading}
                htmlType="submit"
                size="large"
                shape="circle"
                className={btnStyles.styles.orangeBtn}
                icon={<ArrowRightOutlined />}
              />
            </motion.div>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

  return (
    <Row justify="center" align="middle" className={styles.mainWrapper}>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <motion.div className={styles.bgAbsolute} />
      <Col span={isTabletOrMobile ? 24 : 16} style={{ background: 'white' }}>
        <Row
          className={styles.signInWrapper}
          justify={isTabletOrMobile ? 'center' : 'start'}
          gutter={isTabletOrMobile ? 0 : 20}
        >
          <Col span={isTabletOrMobile ? 24 : 10} style={{ padding: 0 }}>
            {loginForm()}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignIn;
