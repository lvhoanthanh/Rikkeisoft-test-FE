import { sendRequest } from '@/Configs';
import { API } from '@/Constants';
import {} from '@/Interfaces/AdminManager.interface';
import {
  ICreateAdvertisement,
  IUpdateAdvertisement,
} from '@/Interfaces/Advertisement.interface';
import { STATUS } from '@enums';
import { IFetchData } from '@/Interfaces/FetchData.interface';

const { ADVERTISEMENT } = API;

export const fetchAdvertisements = async (payload: IFetchData) => {
  return await sendRequest(ADVERTISEMENT.ROOT, 'GET', payload);
};

export const fetchPublicAdvertisements = async (payload: IFetchData) => {
  return await sendRequest(ADVERTISEMENT.PUBLIC, 'GET', payload);
};

export const getAdvertisementById = async (id: string) => {
  return await sendRequest(`${ADVERTISEMENT.ROOT}${id}`, 'GET');
};

export const createAdvertisement = async (payload: ICreateAdvertisement) => {
  return await sendRequest(ADVERTISEMENT.ROOT, 'POST', payload);
};

export const updateAdvertisement = async (
  id: string,
  payload: IUpdateAdvertisement,
) => {
  return await sendRequest(`${ADVERTISEMENT.ROOT}${id}`, 'PUT', payload);
};

export const updateAdvertisementStatus = async (id: string, status: STATUS) => {
  return await sendRequest(`${ADVERTISEMENT.UPDATE_STATUS}${id}`, 'PUT', {
    status,
  });
};

export const deleteAdvertisement = async (id: string) => {
  return await sendRequest(`${ADVERTISEMENT.ROOT}${id}`, 'DEL');
};
