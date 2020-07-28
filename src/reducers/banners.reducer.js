import { bannerConstants } from "../constants";

export function banners(state = { loading: true, items: [] }, action) {
  switch (action.type) {
    case bannerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case bannerConstants.GETALL_SUCCESS:
      return {
        items: action.banners,
      };
    case bannerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
