import { ratingConstants } from "../constants";

export function ratings(
  state = {
    loading: true,
    items: [],
    item: null,
    pagination: null,
  },
  action
) {
  switch (action.type) {
    case ratingConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ratingConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.ratings.data,
        //pagination: action.ratings.pagination,
      };
    case ratingConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case ratingConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ratingConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.rating.data,
      };
    case ratingConstants.CREATE_ERROR:
      return { ...state, error: action.error };

    case ratingConstants.REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ratingConstants.REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.rating.data,
      };
    case ratingConstants.REPLY_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
