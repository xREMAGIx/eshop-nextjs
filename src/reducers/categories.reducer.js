import { categoryConstants } from "../constants";

export function categories(
  state = {
    loading: true,
    items: [],
    item: null,
    pagination: null,
  },
  action
) {
  switch (action.type) {
    case categoryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.categories.data,
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case categoryConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.categories.data,
      };
    case categoryConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
