import { userConstants } from "../constants";

const initialState = {
  token: null,
  loading: true,
  isAuthenticated: false,
  user: null,
  items: [],
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        token: action.token.token,
      };
    case userConstants.LOGIN_FAILURE:
      return { error: action.error };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userConstants.REGISTER_FAILURE:
      return { loading: false, error: action.error };

    case userConstants.AUTHENTICATE:
      return { ...state, token: action.token };

    case userConstants.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case userConstants.GETME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user.data,
      };
    case userConstants.GETME_FAILURE:
      return { ...state, error: action.error };

    case userConstants.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        orders: action.orders.data,
      };
    case userConstants.GET_ORDERS_FAILURE:
      return { ...state, error: action.error };

    case userConstants.GET_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        order: action.order.data,
      };
    case userConstants.GET_ORDER_DETAIL_FAILURE:
      return { ...state, error: action.error };

    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users.data,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,

        item: action.user.result,
      };
    case userConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };

    default:
      return state;
  }
}
