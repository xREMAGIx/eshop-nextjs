import { cartConstants } from "../constants";

export function cart(
  state = {
    loading: false,

    items: [],
    item: [],
  },
  action
) {
  switch (action.type) {
    //View
    case cartConstants.VIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cartConstants.VIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        items: action.carts,
      };
    case cartConstants.VIEW_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    //Checkout
    case cartConstants.CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cartConstants.CHECKOUT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        items: [],
      };
    case cartConstants.CHECKOUT_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    //Add item
    case cartConstants.ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case cartConstants.ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.cart,
      };
    case cartConstants.ADD_ITEM_FAILURE:
      return { error: action.error };

    //Subtract item
    case cartConstants.SUBTRACT_ITEM_REQUEST:
      return { ...state, loading: true };
    case cartConstants.SUBTRACT_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.cart,
      };
    case cartConstants.SUBTRACT_ITEM_FAILURE:
      return { error: action.error };

    //Delete item
    case cartConstants.DELETE_ITEM_REQUEST:
      return { ...state, loading: true };
    case cartConstants.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.cart,
      };
    case cartConstants.DELETE_ITEM_FAILURE:
      return { error: action.error };

    case cartConstants.LOGOUT:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}
