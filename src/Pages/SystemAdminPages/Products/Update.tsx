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
  InputNumber,
  Select,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CommonStyles } from '@common';
import { AP_ProductActions } from '@actions';
import { ROUTERS } from '@constants';
import { RootState, useTypedDispatch } from '@store';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { UseMediaQuery } from '@hooks';

type FieldType = {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  file: File;
};

const { updateProduct, getProductById } = AP_ProductActions;

const UpdateProduct: React.FC = () => {
  // Constructors
  const btnStyles = CommonStyles.useButtonBgColor();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { isMobileLandscape } = UseMediaQuery();
  const isActionLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'isActionLoading'),
  );
  const isGetLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'isGetLoading'),
  );
  const detailStore: any = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'details'),
  );
  const categories = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'categoriesList', []),
  );
  const [form] = Form.useForm();
  const [stateDetail, setStateDetail] = useState<any | null>(null);

  useEffect(() => {
    if (!id) navigate(ROUTERS.ADMIN_PRODUCT, { state });
    else dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {
    if (!stateDetail) setStateDetail(detailStore);
  }, [detailStore]);

  useEffect(() => {
    if (stateDetail) {
      form.setFieldsValue({
        name: stateDetail?.name,
        description: stateDetail?.description,
        price: stateDetail?.price,
        categoryId: stateDetail?.category?.id,
        file: stateDetail?.image?.path,
      });
    }
  }, [stateDetail]);

  // Events
  const onSave = (values: FieldType) => {
    if (stateDetail?.id)
      dispatch(
        updateProduct(stateDetail?.id, values, () =>
          navigate(ROUTERS.ADMIN_PRODUCT, { state }),
        ),
      );
  };
  console.log(`${import.meta.env.VITE_BE_URL}storage/${stateDetail?.image?.path}`)
  const _renderForm = () => (
    <Form
      layout={isMobileLandscape ? 'vertical' : 'horizontal'}
      form={form}
      name="updateProductForm"
      wrapperCol={{ span: isMobileLandscape ? 22 : 12, offset: 2 }}
      labelCol={{ span: isMobileLandscape ? 24 : 4 }}
      onFinish={onSave}
      disabled={isGetLoading || isActionLoading}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        style={{ fontWeight: 600 }}
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="description"
        style={{ fontWeight: 600 }}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Price"
        name="price"
        style={{ fontWeight: 600 }}
        rules={[{ required: true, message: 'Please enter the product price' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Category"
        name="categoryId"
        style={{ fontWeight: 600 }}
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select a category">
          {categories.map((category: any) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Flex justify="center" align="center" gap="middle">
          <Button
            danger
            loading={isActionLoading}
            icon={<RollbackOutlined />}
            onClick={() => navigate(ROUTERS.ADMIN_PRODUCT, { state })}
          >
            Back to list
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Are you sure?"
            description={
              <Typography.Text>
                Your action will update <b>{stateDetail?.name}</b> on the system.
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
        <title>Update Product</title>
      </Helmet>
      <Col span={24}>
        <Divider orientation="left" style={{ fontSize: 20, marginBottom: 0 }}>
          Update Product
        </Divider>
      </Col>
      <Col span={24} style={{ padding: '0 2em' }}>
        {_renderForm()}
      </Col>
    </Row>
  );
};

export default UpdateProduct;