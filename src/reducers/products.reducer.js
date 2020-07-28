import { productConstants } from "../constants";

export function products(
  state = {
    loading: true,
    items: [],
    item: null,
    pagination: null,
  },
  action
) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.products.data,
        pagination: action.products.pagination,
      };
    case productConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case productConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.product.data,
      };
    case productConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
