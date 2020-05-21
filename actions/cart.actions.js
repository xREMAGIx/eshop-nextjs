import { cartConstants } from "../constants";
import { cartService } from "../services";
//import { history } from "../_helpers";

export const cartActions = {
  addItem,
  getAll,
  //getById,
  //update,
  //delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    cartService.getAll().then(
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

// function getById(id) {
//   return async (dispatch) => {
//     dispatch(request(id));
//     await brandService.getById(id).then(
//       (brands) => dispatch(success(brands)),
//       (error) => dispatch(failure(error.toString()))
//     );
//   };

//   function request(id) {
//     return { type: brandConstants.GETBYID_REQUEST, id };
//   }
//   function success(brands) {
//     return { type: brandConstants.GETBYID_SUCCESS, brands };
//   }
//   function failure(error) {
//     return { type: brandConstants.GETBYID_FAILURE, error };
//   }
// }

function addItem(productId) {
  return async (dispatch) => {
    dispatch(request(productId));
    await cartService.addItem(productId).then(
      (productId) => {
        dispatch(success(productId));
        //history.push("/brands");
        //window.location.reload();

        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
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
  function success(productId) {
    return { type: cartConstants.ADD_ITEM_SUCCESS, productId };
  }
  function failure(error) {
    return { type: cartConstants.ADD_ITEM_FAILURE, error };
  }
}

// function update(id, brand, image) {
//   return async (dispatch) => {
//     dispatch(request(id));
//     await brandService.update(id, brand, image).then(
//       (id) => {
//         dispatch(success(id));
//         window.location.reload();
//         //dispatch(alertActions.success("Add new post successful"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         //dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(id) {
//     return { type: brandConstants.UPDATE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: brandConstants.UPDATE_SUCCESS, id };
//   }
//   function failure(error) {
//     return { type: brandConstants.UPDATE_FAILURE, id, error };
//   }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return async (dispatch) => {
//     dispatch(request(id));
//     await brandService.delete(id).then(
//       (id) => {
//         dispatch(success(id));
//         window.location.reload();
//       },
//       (error) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id) {
//     return { type: brandConstants.DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: brandConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: brandConstants.DELETE_FAILURE, id, error };
//   }
// }
