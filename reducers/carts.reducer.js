import { cartConstants } from "../constants";

export function cart(
  state = {
    loading: false,
    adding: false,
    updating: false,
    items: [],
    item: [],
  },
  action
) {
  switch (action.type) {
    case cartConstants.VIEW_REQUEST:
      console.log(1);
      return {
        ...state,
        loading: true,
      };
    case cartConstants.VIEW_SUCCESS:
      return {
        items: action.categories,
      };
    case cartConstants.VIEW_FAILURE:
      return {
        error: action.error,
      };

    // case cartConstants.GETBYID_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case cartConstants.GETBYID_SUCCESS:
    //   return {
    //     ...state,
    //     item: action.categories,
    //   };
    // case cartConstants.GETBYID_ERROR:
    //   return { error: action.error };

    case cartConstants.ADD_ITEM_REQUEST:
      return { ...state, adding: true };
    case cartConstants.ADD_ITEM_SUCCESS:
      return {
        ...state,
        adding: false,
      };
    case cartConstants.ADD_ITEM_FAILURE:
      return { error: action.error };

    // case cartConstants.UPDATE_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case cartConstants.UPDATE_SUCCESS:
    //   return {};
    // case cartConstants.UPDATE_FAILURE:
    //   return { error: action.error };

    // case cartConstants.DELETE_REQUEST:
    //   // add 'deleting:true' property to user being deleted
    //   return {
    //     ...state,
    //     items: state.items.map((cart) =>
    //       cart.id === action.id ? { ...cart, deleting: true } : cart
    //     ),
    //   };
    // case cartConstants.DELETE_SUCCESS:
    //   // remove deleted user from state
    //   return {
    //     items: state.items.filter((cart) => cart.id !== action.id),
    //   };
    // case cartConstants.DELETE_FAILURE:
    //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    //   return {
    //     ...state,
    //     items: state.items.map((cart) => {
    //       if (cart.id === action.id) {
    //         // make copy of user without 'deleting:true' property
    //         const { deleting, ...cartCopy } = cart;
    //         // return copy of user with 'deleteError:[error]' property
    //         return { ...cartCopy, deleteError: action.error };
    //       }

    //       return cart;
    //     }),
    //   };
    default:
      return state;
  }
}
