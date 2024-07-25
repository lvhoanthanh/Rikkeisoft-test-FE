import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Divider,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Popconfirm,
  Tooltip,
  Form,
  Select,
  Flex,
} from 'antd';
import { RootState, useTypedDispatch } from '@store';
import { Table, Column, HeaderCell, Cell, SortType } from 'rsuite-table';
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { AP_CategoryActions, AP_ProductActions } from '@actions';
import { CommonStyles, LoadingSpin } from '@common';
import { IFetchData } from '@/Interfaces/FetchData.interface';
import PaginateTable from './Pagination';
import EmptyTable from './EmptyTable';
import { ROUTERS, DATE_FORMAT } from '@constants';
import dayjs from 'dayjs';
import { UseMediaQuery } from '@hooks';

const { fetchCategorys } = AP_CategoryActions;
const { fetchProducts, deleteProduct } = AP_ProductActions;
const { Option } = Select;

const ProductDataTable: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const btnStyles = CommonStyles.useButtonBgColor();
  const { isMobileLandscape } = UseMediaQuery();
  const isFetchLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'isFetchLoading'),
  );
  const isActionLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'isActionLoading'),
  );
  const categoriesList = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'categoriesList'),
  );

  const productsList = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'productsList'),
  );

  const paginate = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'paginate'),
  );
  const filterStorage: IFetchData = useSelector((state: RootState) =>
    _.get(state.AP_PRODUCT, 'filters'),
  );
  const [tableData, setTableData] = useState([]);
  const [filterPayload, setFilterPayload] = useState<IFetchData>(filterStorage);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProducts({ ...filterPayload, ...state }));
    dispatch(fetchCategorys({ limit: 100, page: 1 }));
    setFilterPayload({ ...filterPayload, ...state });
  }, [dispatch, state]);

  useEffect(() => {
    setTableData(productsList);
  }, [productsList]);

  // Events
  const onFilter = (values: { [key: string]: any }) => {
    const newFilter: any = {
      ...filterPayload,
      page: 1,
      ...values,
    };
    setFilterPayload(newFilter);
    dispatch(fetchProducts(newFilter));
  };

  const onPaginate = (pagi: { page: number; limit: number }) => {
    const newFilter = { ...filterPayload, ...pagi };
    setFilterPayload(newFilter);
    dispatch(fetchProducts(newFilter));
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    // Update filterPayload with selected categories
    const newFilter = { ...filterPayload, categoryIds: selectedCategories, page: 1 };
    setFilterPayload(newFilter);
    dispatch(fetchProducts(newFilter));
  };

  const _renderTable = () => (
    <Table
      data={tableData}
      height={isMobileLandscape ? 300 : 600}
      affixHeader
      affixHorizontalScrollbar
      loading={isFetchLoading}
      renderEmpty={() => <EmptyTable />}
      renderLoading={() => <LoadingSpin />}
      sortColumn={filterPayload?.sortBy}
      sortType={filterPayload?.orderBy?.toLowerCase()}
      headerHeight={60}
      hover
      cellBordered
      onSortColumn={(sortBy: string, orderBy?: SortType) =>
        onFilter({ sortBy, orderBy: orderBy?.toUpperCase(), page: 1 })
      }
    >
      <Column width={70} fixed resizable align="center">
        <HeaderCell verticalAlign="center">No</HeaderCell>
        <Cell>
          {(rowData: any) => {
            const findIndex = _.findIndex(tableData, rowData);
            const rowNumber =
              (paginate?.currentPage - 1) * paginate?.itemsPerPage +
              findIndex +
              1;
            return rowNumber;
          }}
        </Cell>
      </Column>
      <Column width={300} fixed={!isMobileLandscape} resizable sortable>
        <HeaderCell verticalAlign="center">Name</HeaderCell>
        <Cell dataKey="name">
          {(rowData: any) => {
            return (
              <Tooltip title={'restricted access'}>
                <Typography.Link
                  ellipsis
                  onClick={() =>
                    navigate(`${ROUTERS.ADMIN_PRODUCT}/${rowData?.id}`, {
                      state: filterPayload,
                    })
                  }
                >
                  {rowData?.name}
                </Typography.Link>
              </Tooltip>
            );
          }}
        </Cell>
      </Column>
      <Column minWidth={200} flexGrow={1} resizable>
        <HeaderCell verticalAlign="center">Category</HeaderCell>
        <Cell dataKey="category">
          {(rowData: any) => {
            return (
              <Typography.Text ellipsis={{ tooltip: rowData?.category?.name }}>
                {rowData?.category?.name}
              </Typography.Text>
            );
          }}
        </Cell>
      </Column>
      <Column minWidth={200} flexGrow={1} resizable>
        <HeaderCell verticalAlign="center">Description</HeaderCell>
        <Cell dataKey="description">
          {(rowData: any) => {
            return (
              <Typography.Text ellipsis={{ tooltip: rowData?.description }}>
                {rowData?.description}
              </Typography.Text>
            );
          }}
        </Cell>
      </Column>

      <Column width={200} sortable resizable>
        <HeaderCell verticalAlign="center">Last modified</HeaderCell>
        <Cell dataKey="updatedAt">
          {(rowData: any) => {
            return dayjs(rowData?.updatedAt).format(DATE_FORMAT.FULL_DATE_TIME);
          }}
        </Cell>
      </Column>
      <Column width={100} align="center" fixed="right">
        <HeaderCell verticalAlign="center">Remove</HeaderCell>
        <Cell style={{ padding: '5px' }} verticalAlign="center">
          {(rowData: any) => {
            return (
              <Popconfirm
                placement="topLeft"
                title="Are you sure?"
                description={
                  <Typography.Text>
                    Your action will delete <b>{rowData?.name}</b> on the
                    system.
                  </Typography.Text>
                }
                okText="Yes!"
                showCancel={false}
                onConfirm={() =>
                  dispatch(deleteProduct(rowData?.id, filterPayload))
                }
              >
                <Button
                  size="small"
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            );
          }}
        </Cell>
      </Column>
    </Table>
  );

  return (
    <Row style={{ background: 'white' }}>
      <Col span={24}>
        <Divider orientation="left" style={{ fontSize: 20, marginBottom: 0 }}>
          Products List
        </Divider>
        <Divider orientation="right" style={{ marginTop: 0 }}>
          <Button
            type="primary"
            loading={isFetchLoading}
            disabled={isActionLoading}
            className={btnStyles.styles.greenBtn}
            icon={<PlusOutlined />}
            onClick={() =>
              navigate(ROUTERS.ADMIN_CREATE_PRODUCT, { state: filterPayload })
            }
          >
            Create denied
          </Button>
        </Divider>
      </Col>
      <Col span={24} style={{ padding: '2em' }}>
        <Form
          form={form}
          disabled={isActionLoading || isFetchLoading}
          onFinish={onFilter}
          name="productFilterForm"
        >
          <Col span={24}>
            <Flex gap={10} wrap="wrap">
              <Form.Item name="keyword" style={{ marginBottom: 0 }}>
                <Input.Search
                  placeholder="Search by name or title"
                  onSearch={() => form.submit()}
                  allowClear
                />
              </Form.Item>

              <Form.Item name="categoryIds" style={{ marginBottom: 0 }}>
                <Select
                  mode="multiple"
                  placeholder="Select categories"
                  allowClear
                  style={{ width: 400 }}
                  onChange={handleCategoryChange}
                >
                  {categoriesList.map((category: any) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Tooltip title="Reset filters">
                <Button
                  icon={<ReloadOutlined />}
                  danger
                  loading={isFetchLoading}
                  onClick={() => {
                    form.resetFields();
                    setFilterPayload({ page: 1, limit: 20 });
                    dispatch(fetchProducts({ page: 1, limit: 20 }));
                  }}
                />
              </Tooltip>

            </Flex>
          </Col>
        </Form>
      </Col>

      <Divider style={{ margin: 0 }} />
      <Col span={24}>{_renderTable()}</Col>
      <Col span={24} style={{ padding: '2em', textAlign: 'right' }}>
        <PaginateTable
          paginate={paginate}
          onPaginate={(page, limit) => onPaginate({ page, limit })}
        />
      </Col>
    </Row>
  );
};

export default ProductDataTable;
