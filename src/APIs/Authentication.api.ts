import { sendRequest } from '@/Configs';
import { API } from '@constants';
import {
  ILoginStructure,
} from '@interfaces/Auth.interface';

const { AUTH } = API;

export const login = async (payload: ILoginStructure) => {
  console.log(payload, 'aaaaaaaaa')
  return await sendRequest(AUTH.LOGIN, 'POST', payload);
};
