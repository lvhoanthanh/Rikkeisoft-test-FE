import React from 'react';
import _ from 'lodash';
import { Pagination } from 'antd';

interface IPaginationProps {
  paginate: any;
  onPaginate(page: number, pageSize: number): void;
}

const PaginateTable: React.FC<IPaginationProps> = ({
  paginate,
  onPaginate,
}: IPaginationProps) => {
  return (
    <Pagination
      style={{width: '100%'}}
      total={paginate?.totalItems}
      showSizeChanger
      showQuickJumper
      pageSize={paginate?.itemsPerPage}
      pageSizeOptions={[20, 30, 40]}
      onChange={onPaginate}
      onShowSizeChange={onPaginate}
      current={paginate?.currentPage}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    />
  );
};

export default PaginateTable;
