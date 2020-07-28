import { bannerConstants } from "../constants";
import { bannerService } from "../services";

export const bannerActions = {
  getAll,
};

function getAll() {
  return async (dispatch) => {
    dispatch(request());

    await bannerService.getAll().then(
      (banner) => dispatch(success(banner)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: bannerConstants.GETALL_REQUEST };
  }
  function success(banners) {
    return { type: bannerConstants.GETALL_SUCCESS, banners };
  }
  function failure(error) {
    return { type: bannerConstants.GETALL_FAILURE, error };
  }
}
