import { sendRequest } from '@/Configs';
import { ICreateProduct } from '@/Interfaces/Product.interface';
import { IFetchData } from '@/Interfaces/FetchData.interface';
import { API } from '@constants';

const { CATEGORY } = API;

export const fetchProducts = async (payload: IFetchData) => {
  return await sendRequest(CATEGORY.ROOT, 'GET', payload);
};

export const getProductById = async (id: string) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'GET');
};

export const createProduct = async (payload: ICreateProduct) => {
  return await sendRequest(CATEGORY.ROOT, 'POST', payload);
};

export const updateProduct = async (id: string, payload: ICreateProduct) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'PUT', payload);
};

export const deleteProduct = async (id: string) => {
  return await sendRequest(`${CATEGORY.ROOT}${id}`, 'DEL');
};
