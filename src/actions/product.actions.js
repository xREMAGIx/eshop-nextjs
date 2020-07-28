import { productConstants } from "../constants";
import { productService } from "../services";

export const productActions = {
  getAll,
  getById,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await productService.getAll(url).then(
      async (products) => {
        dispatch(success(products));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.GETALL_REQUEST };
  }
  function success(products) {
    return { type: productConstants.GETALL_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));

    await productService.getById(id).then(
      (product) => {
        dispatch(success(product));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: productConstants.GETBYID_REQUEST, id };
  }
  function success(product) {
    return { type: productConstants.GETBYID_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.GETBYID_FAILURE, error };
  }
}
