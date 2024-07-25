import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Divider,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  Flex,
  Typography,
  Popconfirm,
  Tooltip,
  Form,
} from 'antd';
import { RootState, useTypedDispatch } from '@store';
import { Table, Column, HeaderCell, Cell, SortType } from 'rsuite-table';
import {
  PlusOutlined,
  UserOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { AP_CategoryActions } from '@actions';
import { CommonStyles, LoadingSpin } from '@common';
import { IFetchData } from '@/Interfaces/FetchData.interface';
import PaginateTable from './Pagination';
import EmptyTable from './EmptyTable';
import { ROUTERS, DATE_FORMAT } from '@constants';
import dayjs from 'dayjs';
import { UseMediaQuery } from '@hooks';

const { fetchCategorys, deleteCategory } =
AP_CategoryActions;

const CategoryDataTable: React.FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const btnStyles = CommonStyles.useButtonBgColor();
  const { isMobileLandscape } = UseMediaQuery();
  const isFetchLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'isFetchLoading'),
  );
  const isActionLoading: boolean = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'isActionLoading'),
  );
  const categoriesList = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'categoriesList'),
  );
  const paginate = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'paginate'),
  );
  const filterStorage: IFetchData = useSelector((state: RootState) =>
    _.get(state.AP_CATEGORY, 'filters'),
  );
  const [tableData, setTableData] = useState([]);
  const [filterPayload, setFilterPayload] = useState<IFetchData>(filterStorage);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCategorys({ ...filterPayload, ...state }));
    setFilterPayload({ ...filterPayload, ...state });
  }, [state]);

  useEffect(() => {
    setTableData(categoriesList);
  }, [categoriesList]);

  // Events
  
  useEffect(() => {
    setTableData(categoriesList);
  }, [categoriesList]);

  // Events
  const onFilter = (values: { [key: string]: any }) => {
    const newFilter: any = {
      ...filterPayload,
      page: 1,
      ...values,
    };
    setFilterPayload(newFilter);
    dispatch(fetchCategorys(newFilter));
  };

  const onPaginate = (pagi: { page: number; limit: number }) => {
    const newFilter = { ...filterPayload, ...pagi };
    setFilterPayload(newFilter);
    dispatch(fetchCategorys(newFilter));
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
              <Tooltip title={rowData?.name}>
                <Typography.Link
                  ellipsis
                  onClick={() =>
                    navigate(`${ROUTERS.ADMIN_CATEGORY}/${rowData?.id}`, {
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
        <HeaderCell verticalAlign="center">description</HeaderCell>
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
      <Column width={200} resizable>
        <HeaderCell verticalAlign="center">Author</HeaderCell>
        <Cell style={{ padding: '5px' }} verticalAlign="center">
          {(rowData: any) => {
            return (
              <Flex align="center" gap="small">
                <Avatar
                  src={rowData?.author?.userData?.avatar?.thumbnail || null}
                  icon={
                    !rowData?.author?.userData?.avatar?.thumbnail && (
                      <UserOutlined />
                    )
                  }
                  shape="square"
                  size={25}
                  style={{ marginRight: 10 }}
                />
                <Typography.Text ellipsis>
                  {rowData?.author?.userData?.fullName}
                </Typography.Text>
              </Flex>
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
                    Your action will delete <b>{rowData?.title}</b> on the
                    system.
                  </Typography.Text>
                }
                okText="Yes!"
                showCancel={false}
                onConfirm={() =>
                  dispatch(deleteCategory(rowData?.id, filterPayload))
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
          Categories List
        </Divider>
        <Divider orientation="right" style={{ marginTop: 0 }}>
          <Button
            type="primary"
            loading={isFetchLoading}
            disabled={isActionLoading}
            className={btnStyles.styles.greenBtn}
            icon={<PlusOutlined />}
            onClick={() =>
              navigate(ROUTERS.ADMIN_CREATE_CATEGORY, { state: filterPayload })
            }
          >
            Create new category
          </Button>
        </Divider>
      </Col>
      <Col span={24} style={{ padding: '2em' }}>
        <Form
          form={form}
          disabled={isActionLoading || isFetchLoading}
          onFinish={onFilter}
          name="categoryFilterForm"
        >
          <Col span={24}>
            <Flex gap={10} wrap="wrap">
              <Form.Item name="keyword" style={{ marginBottom: 0 }}>
                <Input.Search
                  placeholder="Search by name of title"
                  onSearch={() => form.submit()}
                  allowClear
                />
              </Form.Item>
              
              <Tooltip title="Reset filters">
                <Button
                  icon={<ReloadOutlined />}
                  danger
                  loading={isFetchLoading}
                  onClick={() => {
                    form.resetFields();
                    setFilterPayload({ page: 1, limit: 20 });
                    dispatch(fetchCategorys({ page: 1, limit: 20 }));
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

export default CategoryDataTable;
