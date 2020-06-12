import { userConstants } from "../constants";
import { userService } from "../services";

import { setCookie, getCookie, removeCookie } from "../helpers/cookie";
import Router from "next/router";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  getMe,
};

function getMe() {
  return (dispatch) => {
    dispatch(request());

    userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.GETME_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function login(user) {
  let auth = { token: "", user_data: "" };

  return async (dispatch) => {
    dispatch(request(user));
    await userService.login(user).then(
      async (data) => {
        dispatch(success(data));

        setCookie("token", data.token);

        auth.token = data.token;

        dispatch(requestGetMe());

        await userService.getMe(data.token).then(
          (userData) => {
            auth.user_data = userData.data;
            dispatch(successGetMe(userData));
            authenticate(auth, () => {
              Router.push("/");
            });
          },
          (error) => {
            dispatch(failureGetMe(error.toString()));
          }
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(token) {
    return { type: userConstants.LOGIN_SUCCESS, token };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  function requestGetMe() {
    return { type: userConstants.GETME_REQUEST };
  }
  function successGetMe(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failureGetMe(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  removeCookie("token");
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
  Router.push("/login");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        history.push({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

export const checkServerSideCookie = (ctx) => {
  const isServer = !!ctx.req;

  if (isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie("token", ctx.req);
      ctx.store.dispatch(reauthenticate(token));
    }
  } else {
    const token = ctx.store.getState().users.token;

    if (token && (ctx.pathname === "/login" || ctx.pathname === "/register")) {
      setTimeout(function () {
        Router.push("/");
      }, 0);
    }
  }
};

export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch(auth(token));
  };

  function auth(token) {
    return { type: userConstants.AUTHENTICATE, token };
  }
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user_data);
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// localstorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
