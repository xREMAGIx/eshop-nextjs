import { brandConstants } from "../constants";

export function brands(
  state = {
    loading: true,
    items: [],
    item: null,
    pagination: null,
  },
  action
) {
  switch (action.type) {
    case brandConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.brands.data,
      };
    case brandConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case brandConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.brands.data,
      };
    case brandConstants.GETBYID_ERROR:
      return { error: action.error };

    default:
      return state;
  }
}
