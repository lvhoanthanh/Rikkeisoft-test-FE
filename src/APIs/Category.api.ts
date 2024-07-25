import { sendRequest } from '@/Configs';
import { ICreateCategory } from '@/Interfaces/Category.interface';
import { IFetchData } from '@/Interfaces/FetchData.interface';
import { API } from '@constants';

const { CATEGORY } = API;

export const fetchCategorys = async (payload: IFetchData) => {
  return await sendRequest(CATEGORY.ROOT, 'GET', payload);
};

export const getCategoryById = async (id: string) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'GET');
};

export const createCategory = async (payload: ICreateCategory) => {
  return await sendRequest(CATEGORY.ROOT, 'POST', payload);
};

export const updateCategory = async (id: string, payload: ICreateCategory) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'PUT', payload);
};

export const deleteCategory = async (id: string) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'DEL');
};
