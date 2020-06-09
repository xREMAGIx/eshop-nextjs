import { getCookie } from "../helpers";
import Cookies from "js-cookie";
import axios from "axios";
//import setAuthToken from "../helpers/auth-header";

//setAuthToken(getCookie("token"));

export const cartService = {
  getAll,
  checkOutCart,
  addItem,
  subtractItem,
  deleteItem,
};

async function getAll(token) {
  const requestConfig = {
    // headers: {
    //   authorization: "Bearer " + getCookie("token"),
    // },
  };
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios
    .get(`http://localhost:5000/api/cart`, requestConfig)
    .then(handleResponse);
}

async function checkOutCart(token) {
  const requestConfig = {
    payment: "Cash",
  };
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios
    .post(`http://localhost:5000/api/orders/createOrder`, requestConfig)
    .then(handleResponse);
}

async function addItem(productId, token) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios
    .put(`http://localhost:5000/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

async function subtractItem(productId, token) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios
    .patch(`http://localhost:5000/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

async function deleteItem(productId, token) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios
    .delete(`http://localhost:5000/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status === 404) {
    // if (response.status === 401) {
    //   // auto logout if 401 response returned from api
    //   //logout();
    //   location.reload(true);
    // }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
