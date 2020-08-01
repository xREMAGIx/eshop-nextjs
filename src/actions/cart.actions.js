import { cartConstants } from "../constants";
import { cartService } from "../services";
//import { history } from "../_helpers";

export const cartActions = {
  addItem,
  getAll,
  subtractItem,
  deleteItem,
  checkOutCart,
  logout,
};

function getAll(token) {
  return async (dispatch) => {
    dispatch(request());

    await cartService.getAll(token).then(
      (carts) => {
        dispatch(success(carts));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: cartConstants.VIEW_REQUEST };
  }
  function success(carts) {
    return { type: cartConstants.VIEW_SUCCESS, carts };
  }
  function failure(error) {
    return { type: cartConstants.VIEW_FAILURE, error };
  }
}

function addItem(productId, token) {
  return async (dispatch) => {
    dispatch(request(productId));
    await cartService.addItem(productId, token).then(
      (cart) => {
        dispatch(success(cart));
        // await dispatch(getAll(token));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(productId) {
    return { type: cartConstants.ADD_ITEM_REQUEST, productId };
  }
  function success(cart) {
    return { type: cartConstants.ADD_ITEM_SUCCESS, cart };
  }
  function failure(error) {
    return { type: cartConstants.ADD_ITEM_FAILURE, error };
  }
}

function subtractItem(productId, token) {
  return async (dispatch) => {
    dispatch(request(productId));
    await cartService.subtractItem(productId, token).then(
      (cart) => {
        dispatch(success(cart));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(productId) {
    return { type: cartConstants.SUBTRACT_ITEM_REQUEST, productId };
  }
  function success(cart) {
    return { type: cartConstants.SUBTRACT_ITEM_SUCCESS, cart };
  }
  function failure(error) {
    return { type: cartConstants.SUBTRACT_ITEM_FAILURE, error };
  }
}

function deleteItem(productId, token) {
  return async (dispatch) => {
    dispatch(request(productId));
    await cartService.deleteItem(productId, token).then(
      (cart) => {
        dispatch(success(cart));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(productId) {
    return { type: cartConstants.DELETE_ITEM_REQUEST, productId };
  }
  function success(cart) {
    return { type: cartConstants.DELETE_ITEM_SUCCESS, cart };
  }
  function failure(error) {
    return { type: cartConstants.DELETE_ITEM_FAILURE, error };
  }
}

function checkOutCart(token, formData) {
  return async (dispatch) => {
    dispatch(request());

    await cartService.checkOutCart(token, formData).then(
      (carts) => {
        dispatch(success(carts));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: cartConstants.CHECKOUT_REQUEST };
  }
  function success(cart) {
    return { type: cartConstants.CHECKOUT_SUCCESS, cart };
  }
  function failure(error) {
    return { type: cartConstants.CHECKOUT_FAILURE, error };
  }
}

function logout() {
  return { type: cartConstants.LOGOUT };
}
