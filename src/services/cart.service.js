import axios from "axios";
import setAuthToken from "../store/auth-header";

export const cartService = {
  getAll,
  checkOutCart,
  addItem,
  subtractItem,
  deleteItem,
};

const backend_url = "https://nextjs-eshop-backend.herokuapp.com";

async function getAll(token) {
  setAuthToken(token);

  if (process.env.DB_HOST)
    return await axios
      .get(`${process.env.DB_HOST}/api/cart`)
      .then(handleResponse);
  else
    return await axios
      .get(`${backend_url}/api/cart`, requestConfig)
      .then(handleResponse);
}

async function checkOutCart(token) {
  setAuthToken(token);
  const requestConfig = {
    payment: "Cash",
  };

  if (process.env.DB_HOST)
    return await axios
      .post(`${process.env.DB_HOST}/api/orders/createOrder`)
      .then(handleResponse);
  else
    return await axios
      .post(`${backend_url}/api/orders/createOrder`, requestConfig)
      .then(handleResponse);
}

async function addItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (process.env.DB_HOST)
    return await axios
      .put(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .put(`${backend_url}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
}

async function subtractItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (process.env.DB_HOST)
    return await axios
      .patch(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .patch(`${backend_url}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
}

async function deleteItem(productId, token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (process.env.DB_HOST)
    return await axios
      .delete(`${process.env.DB_HOST}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .delete(`${backend_url}/api/cart/${productId}`, requestConfig)
      .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;

  if (response.status > 400) {
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
