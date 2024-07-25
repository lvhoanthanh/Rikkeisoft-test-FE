import { sendRequest } from '@/Configs';
import { IFetchData } from '@/Interfaces/FetchData.interface';
import { API } from '@constants';

const { USER } = API;

export const fetchUsers = async (payload: IFetchData) => {
  return await sendRequest(USER.ROOT, 'GET', payload);
};

export const getUserById = async (id: string) => {
  return await sendRequest(`${USER.ROOT}${id}`, 'GET');
};

export const getSelfProfile = async () => {
  return await sendRequest(`${USER.GET_SELF}`, 'GET');
};
