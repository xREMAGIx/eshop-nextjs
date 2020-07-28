import { brandConstants } from "../constants";
import { brandService } from "../services";
//import { history } from "../_helpers";

export const brandActions = {
  getAll,
  getById,
};

function getAll() {
  return async (dispatch) => {
    dispatch(request());

    await brandService.getAll().then(
      (brands) => {
        dispatch(success(brands));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: brandConstants.GETALL_REQUEST };
  }
  function success(brands) {
    return { type: brandConstants.GETALL_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await brandService.getById(id).then(
      (brands) => dispatch(success(brands)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: brandConstants.GETBYID_REQUEST, id };
  }
  function success(brands) {
    return { type: brandConstants.GETBYID_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.GETBYID_FAILURE, error };
  }
}
