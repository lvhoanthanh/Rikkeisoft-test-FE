import API from '@/APIs';
import Utils from '@/Utils';
import { ACTION_TYPES } from '../../ActionTypes';
import { ICreateProduct } from '@/Interfaces/Product.interface';
import { IFetchData } from '@/Interfaces/FetchData.interface';

// SINGLE ACTIONS
const setProductsActionLoading = () => {
  return {
    type: ACTION_TYPES.SET_PRODUCT_ACTION_LOADING,
  };
};

const setProductsFetchLoading = () => {
  return {
    type: ACTION_TYPES.SET_PRODUCT_FETCH_LOADING,
  };
};

const setProductsGetLoading = () => {
  return {
    type: ACTION_TYPES.SET_PRODUCT_GET_LOADING,
  };
};

const resetProductReducer = () => {
  return {
    type: ACTION_TYPES.RESET_PRODUCT_REDUCER,
  };
};

// ASYNC ACTIONS

const fetchProductsSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_SUCCESS,
    payload,
  };
};

const fetchProductsFailure = () => {
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_FAILURE,
  };
};

const fetchProducts = (payload: IFetchData) => {
  return async (dispatch: any) => {
    dispatch(setProductsFetchLoading());
    await API.fetchProducts(payload)
      .then(async (response: any) => {
        const result: any = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(fetchProductsFailure());
        else await dispatch(fetchProductsSuccess({ ...result, filters: payload }));
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchProductsFailure());
      });
  };
};

const getProductByIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_PRODUCT_BY_ID_SUCCESS,
    payload,
  };
};

const getProductByIdFailure = () => {
  return {
    type: ACTION_TYPES.GET_PRODUCT_BY_ID_FAILURE,
  };
};

const getProductById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setProductsGetLoading());
    await API.getProductById(id)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(getProductByIdFailure());
        else await dispatch(getProductByIdSuccess(result));
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getProductByIdFailure());
      });
  };
};

const createProductSuccess = () => {
  return {
    type: ACTION_TYPES.CREATE_PRODUCT_SUCCESS,
  };
};

const createProductFailure = () => {
  return {
    type: ACTION_TYPES.CREATE_PRODUCT_FAILURE,
  };
};

const createProduct = (payload: ICreateProduct, callback: Function) => {
  return async (dispatch: any) => {
    dispatch(setProductsActionLoading());
    await API.createProduct(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(createProductFailure());
        else {
          await dispatch(createProductSuccess());
          callback();
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(createProductFailure());
      });
  };
};

const updateProductSuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
  };
};

const updateProductFailure = () => {
  return {
    type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
  };
};

const updateProduct = (id: string, payload: ICreateProduct, callback: Function) => {
  return async (dispatch: any) => {
    dispatch(setProductsActionLoading());
    await API.updateProduct(id, payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateProductFailure());
        else {
          await dispatch(updateProductSuccess());
          callback();
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateProductFailure());
      });
  };
};

const deleteProductSuccess = () => {
  return {
    type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
  };
};

const deleteProductFailure = () => {
  return {
    type: ACTION_TYPES.DELETE_PRODUCT_FAILURE,
  };
};

const deleteProduct = (id: string, filterData: IFetchData) => {
  return async (dispatch: any) => {
    dispatch(setProductsActionLoading());
    await API.deleteProduct(id)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(deleteProductFailure());
        else {
          await dispatch(fetchProducts(filterData));
          await dispatch(deleteProductSuccess());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(deleteProductFailure());
      });
  };
};


export {
  fetchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  resetProductReducer,
};
