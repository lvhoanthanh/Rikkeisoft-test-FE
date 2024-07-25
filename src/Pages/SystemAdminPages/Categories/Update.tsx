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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CommonStyles } from '@common';
import { AP_CategoryActions } from '@actions';
import { ROUTERS } from '@constants';
import { RootState, useTypedDispatch } from '@store';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { UseMediaQuery } from '@hooks';

type FieldType = {
  id: string;
  title: string;
  description: string;
};
const { updateCategory, getCategoryById } = AP_CategoryActions;

const UpdateCategory: React.FC = () => {
  // Constructors
  const btnStyles = CommonStyles.useButtonBgColor();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { isMobileLandscape } = UseMediaQuery();
  const isActionLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'isActionLoading'),
  );
  const isGetLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'isGetLoading'),
  );
  const detailStore: any = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'details'),
  );
  const [form] = Form.useForm();
  const [stateDetail, setStateDetail] = useState<FieldType | null>(null);

  useEffect(() => {
    if (!id) navigate(ROUTERS.ADMIN_CATEGORY, { state });
    else dispatch(getCategoryById(id));
  }, []);

  useEffect(() => {
    if (!stateDetail) setStateDetail(detailStore);
  }, [detailStore]);

  useEffect(() => {
    if (stateDetail) {
      form.setFieldsValue({
        title: stateDetail?.title,
        description: stateDetail?.description,
      });
    }
  }, [stateDetail]);

  // Events
  const onSave = (values: FieldType) => {
    if (stateDetail)
      dispatch(
        updateCategory(stateDetail?.id, values, () =>
          navigate(ROUTERS.ADMIN_CATEGORY, { state }),
        ),
      );
  };

  const _renderForm = () => (
    <Form
      layout={isMobileLandscape ? 'vertical' : 'horizontal'}
      form={form}
      name="updateCategoryForm"
      wrapperCol={{ span: isMobileLandscape ? 22 : 12, offset: 2 }}
      labelCol={{ span: isMobileLandscape ? 24 : 4 }}
      onFinish={onSave}
      disabled={isGetLoading || isActionLoading}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Title"
        name="title"
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
        <Input.TextArea rows={4} />
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
          <Popconfirm
            placement="topLeft"
            title="Are you sure?"
            description={
              <Typography.Text>
                Your action will update <b>{stateDetail?.title}</b> on the
                system.
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
        <title>Update Category</title>
      </Helmet>
      <Col span={24}>
        <Divider orientation="left" style={{ fontSize: 20, marginBottom: 0 }}>
          Update Category
        </Divider>
      </Col>
      <Col span={24} style={{ padding: '0 2em' }}>
        {_renderForm()}
      </Col>
    </Row>
  );
};

export default UpdateCategory;
