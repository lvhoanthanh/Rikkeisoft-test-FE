import {
  Button,
  Col,
  Flex,
  Input,
  Row,
  Typography,
  Divider,
  Form,
  Popconfirm,
} from 'antd';
import _ from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import {  CommonStyles } from '@common';
import { ROUTERS } from '@constants';
import { RootState, useTypedDispatch } from '@store';
import { AP_CategoryActions } from '@actions';
import {
  SaveOutlined,
  RollbackOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { UseMediaQuery } from '@hooks';

type FieldType = {
  name: string;
  description: string;
};
const { createCategory } = AP_CategoryActions;

const CreateCategory: React.FC = () => {
  // Constructors
  const btnStyles = CommonStyles.useButtonBgColor();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isMobileLandscape } = UseMediaQuery();
  const isActionLoading: any = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'isActionLoading'),
  );
  const [form] = Form.useForm();

  // Events
  const onSave = (values: FieldType) =>
    dispatch(
      createCategory(values, () => {
        form.resetFields();
        navigate(ROUTERS.ADMIN_CATEGORY, { state });
      }),
    );

  const _renderForm = () => (
    <Form
      layout={isMobileLandscape ? 'vertical' : 'horizontal'}
      form={form}
      name="createCategoryForm"
      wrapperCol={{ span: isMobileLandscape ? 22 : 12, offset: 2 }}
      labelCol={{ span: isMobileLandscape ? 24 : 4 }}
      onFinish={onSave}
      autoComplete="off"
      disabled={isActionLoading}
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        style={{ fontWeight: 600 }}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Description"
        name="description"
        style={{ fontWeight: 600 }}
      >
        <Input />
      </Form.Item>
     
  
      <Form.Item wrapperCol={{ span: 24 }}>
        <Flex justify="center" align="center" gap="middle">
          <Button
            danger
            loading={isActionLoading}
            icon={<RollbackOutlined />}
            onClick={() => navigate(ROUTERS.ADMIN_CATEGORY, { state })}
          >
            Back to list
          </Button>
          <Button
            danger
            key="clear"
            loading={isActionLoading}
            icon={<UndoOutlined />}
            onClick={() => form.resetFields()}
          >
            Clear Form
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Are you sure?"
            description={
              <Typography.Text>
                Your action will create new <b>blog</b> on the system.
              </Typography.Text>
            }
            okText="Yes!"
            showCancel={false}
            onConfirm={() => form.submit()}
          >
            <Button
              type="primary"
              loading={isActionLoading}
              className={btnStyles.styles.greenBtn}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          </Popconfirm>
        </Flex>
      </Form.Item>
    </Form>
  );

  return (
    <Row style={{ background: 'white' }}>
      <Helmet>
        <title>Create Category</title>
      </Helmet>
      <Col span={24}>
        <Divider orientation="left" style={{ fontSize: 20 }}>
          Create Category
        </Divider>
      </Col>
      <Col span={24} style={{ padding: '0 2em' }}>
        {_renderForm()}
      </Col>
    </Row>
  );
};

export default CreateCategory;
