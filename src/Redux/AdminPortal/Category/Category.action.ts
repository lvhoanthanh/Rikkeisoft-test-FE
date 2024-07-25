import API from '@/APIs';
import Utils from '@/Utils';
import { ACTION_TYPES } from '../../ActionTypes';
import { ICreateCategory } from '@/Interfaces/Category.interface';
import { IFetchData } from '@/Interfaces/FetchData.interface';

// SINGLE ACTIONS
const setCategorysActionLoading = () => {
  return {
    type: ACTION_TYPES.SET_CATEGORY_ACTION_LOADING,
  };
};

const setCategorysFetchLoading = () => {
  return {
    type: ACTION_TYPES.SET_CATEGORY_FETCH_LOADING,
  };
};

const setCategorysGetLoading = () => {
  return {
    type: ACTION_TYPES.SET_CATEGORY_GET_LOADING,
  };
};

const resetCategorysReducer = () => {
  return {
    type: ACTION_TYPES.RESET_CATEGORY_REDUCER,
  };
};

// ASYNC ACTIONS

const fetchCategorysSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
    payload,
  };
};

const fetchCategorysFailure = () => {
  return {
    type: ACTION_TYPES.FETCH_CATEGORY_FAILURE,
  };
};

const fetchCategorys = (payload: IFetchData) => {
  console.log(payload)
  return async (dispatch: any) => {
    dispatch(setCategorysFetchLoading());
    await API.fetchCategorys(payload)
      .then(async (response: any) => {
        const result: any = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(fetchCategorysFailure());
        else await dispatch(fetchCategorysSuccess({ ...result, filters: payload }));
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchCategorysFailure());
      });
  };
};

const getCategoryByIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_CATEGORY_BY_ID_SUCCESS,
    payload,
  };
};

const getCategoryByIdFailure = () => {
  return {
    type: ACTION_TYPES.GET_CATEGORY_BY_ID_FAILURE,
  };
};

const getCategoryById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setCategorysGetLoading());
    await API.getCategoryById(id)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(getCategoryByIdFailure());
        else await dispatch(getCategoryByIdSuccess(result));
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getCategoryByIdFailure());
      });
  };
};

const createCategorySuccess = () => {
  return {
    type: ACTION_TYPES.CREATE_CATEGORY_SUCCESS,
  };
};

const createCategoryFailure = () => {
  return {
    type: ACTION_TYPES.CREATE_CATEGORY_FAILURE,
  };
};

const createCategory = (payload: ICreateCategory, callback: Function) => {
  return async (dispatch: any) => {
    dispatch(setCategorysActionLoading());
    await API.createCategory(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(createCategoryFailure());
        else {
          await dispatch(createCategorySuccess());
          callback();
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(createCategoryFailure());
      });
  };
};

const updateCategorySuccess = () => {
  return {
    type: ACTION_TYPES.UPDATE_CATEGORY_SUCCESS,
  };
};

const updateCategoryFailure = () => {
  return {
    type: ACTION_TYPES.UPDATE_CATEGORY_FAILURE,
  };
};

const updateCategory = (id: string, payload: ICreateCategory, callback: Function) => {
  return async (dispatch: any) => {
    dispatch(setCategorysActionLoading());
    await API.updateCategory(id, payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateCategoryFailure());
        else {
          await dispatch(updateCategorySuccess());
          callback();
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateCategoryFailure());
      });
  };
};

const deleteCategorySuccess = () => {
  return {
    type: ACTION_TYPES.DELETE_CATEGORY_SUCCESS,
  };
};

const deleteCategoryFailure = () => {
  return {
    type: ACTION_TYPES.DELETE_CATEGORY_FAILURE,
  };
};

const deleteCategory = (id: string, filterData: IFetchData) => {
  return async (dispatch: any) => {
    dispatch(setCategorysActionLoading());
    await API.deleteCategory(id)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(deleteCategoryFailure());
        else {
          await dispatch(fetchCategorys(filterData));
          await dispatch(deleteCategorySuccess());
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(deleteCategoryFailure());
      });
  };
};


export {
  fetchCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  resetCategorysReducer,
};
