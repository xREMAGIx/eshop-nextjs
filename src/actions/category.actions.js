import { categoryConstants } from "../constants";
import { categoryService } from "../services";
//import { history } from "../helpers";

export const categoryActions = {
  getAll,
  getById,
};

function getAll() {
  return async (dispatch) => {
    dispatch(request());

    await categoryService.getAll().then(
      (categories) => {
        dispatch(success(categories));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.getById(id).then(
      (categories) => dispatch(success(categories)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: categoryConstants.GETBYID_REQUEST, id };
  }
  function success(categories) {
    return { type: categoryConstants.GETBYID_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETBYID_FAILURE, error };
  }
}
