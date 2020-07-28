import axios from "axios";
import setAuthToken from "../store/auth-header";

export const cartService = {
  getAll,
  checkOutCart,
  addItem,
  subtractItem,
  deleteItem,
};

async function getAll(token) {
  setAuthToken(token);

  return await axios
    .get(`${process.env.DB_HOST}/api/cart`)
    .then(handleResponse);
}

async function checkOutCart(token) {
  setAuthToken(token);
  const requestConfig = {
    payment: "Cash",
  };

  return await axios
    .post(`${process.env.DB_HOST}/api/orders/createOrder`, requestConfig)
    .then(handleResponse);
}

async function addItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .put(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

async function subtractItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .patch(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

async function deleteItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .delete(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
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
