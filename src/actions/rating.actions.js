import { ratingConstants } from "../constants";
import { ratingService } from "../services";

export const ratingActions = {
  getAll,
  create,
  reply,
};

function getAll(productId, url) {
  return async (dispatch) => {
    dispatch(request());
    await ratingService.getAll(productId, url).then(
      (ratings) => {
        dispatch(success(ratings));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: ratingConstants.GETALL_REQUEST };
  }
  function success(ratings) {
    return { type: ratingConstants.GETALL_SUCCESS, ratings };
  }
  function failure(error) {
    return { type: ratingConstants.GETALL_FAILURE, error };
  }
}

function create(formData, token) {
  return async (dispatch) => {
    dispatch(request(formData));

    await ratingService.create(formData, token).then(
      (rating) => {
        dispatch(success(rating));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(rating) {
    return { type: ratingConstants.CREATE_REQUEST, rating };
  }
  function success(rating) {
    return { type: ratingConstants.CREATE_SUCCESS, rating };
  }
  function failure(error) {
    return { type: ratingConstants.CREATE_FAILURE, error };
  }
}

function reply(id, formData, token, productId) {
  return async (dispatch) => {
    dispatch(request(id));

    await ratingService.reply(id, formData, token).then(
      (rating) => {
        dispatch(success(rating));
        dispatch(getAll(productId));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: ratingConstants.REPLY_REQUEST, id };
  }
  function success(rating) {
    return { type: ratingConstants.REPLY_SUCCESS, rating };
  }
  function failure(error) {
    return { type: ratingConstants.REPLY_FAILURE, error };
  }
}
