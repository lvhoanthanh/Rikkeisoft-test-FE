import { STATUS } from '@enums';

export interface IFetchData {
  status?: string;
  title?: string;
  keyword?: string;
  name?: string;
  email?: string;
  address?: string;
  price?: string;
  roleCode?: string;
  page?: number;
  limit?: number;
  userType?: string;
  orderBy?: any;
  sortBy?: string;
  active?: STATUS;
}

export interface IPaginate {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
