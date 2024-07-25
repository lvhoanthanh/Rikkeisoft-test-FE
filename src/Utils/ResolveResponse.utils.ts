import _ from 'lodash';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

export type ResponseValidation = {
  data: {
    status: boolean;
    message: string;
    payload: any;
  };
  isHideAlert: boolean;
};

// RESOLVE REQUEST RESPONSE
const resolveResponse = (response: ResponseValidation, hideAlert?: boolean) => {
  return new Promise((resolve) => {
    const { status, message, payload } = response.data;
    if (status) {
      if (!hideAlert) toast.success(message);
      resolve(payload || true);
    } else {
      toast.warning(message);
      resolve(false);
    }
  });
};

const resolveFailureResponse = (response: {
  type: string;
  message: string | string[];
}) => {
  return new Promise((resolve) => {
    const { message, type } = response;
    if (type === 'WANRING') toast.warning(message);
    if (type === 'ERROR') toast.error(message);
    if (type === 'SERVER_ERROR')
      Modal.error({
        title: 'SERVER ERROR',
        content: message,
      });
    resolve(true);
  });
};

export { resolveResponse, resolveFailureResponse };
