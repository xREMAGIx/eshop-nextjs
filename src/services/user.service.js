import axios from "axios";
import setAuthToken from "../store/auth-header";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  getMe,
  getOrders,
  getOrderDetail,
};

const backend_url = "https://nextjs-eshop-backend.herokuapp.com";

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  if (process.env.DB_HOST)
    return await axios
      .post(`${process.env.DB_HOST}/api/auth/login`, body, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .post(`${backend_url}/api/auth/login`, body, requestConfig)
      .then(handleResponse);
}

async function getMe(token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (process.env.DB_HOST)
    return await axios
      .get(`${process.env.DB_HOST}/api/auth/me`, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .get(`${backend_url}/api/auth/me`, requestConfig)
      .then(handleResponse);
}

async function getOrders(userId) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (process.env.DB_HOST)
    return await axios
      .get(
        `${process.env.DB_HOST}/api/orders/getUserOrder/${userId}`,
        requestConfig
      )
      .then(handleResponse);
  else
    return await axios
      .get(`${backend_url}/api/orders/getUserOrder/${userId}`, requestConfig)
      .then(handleResponse);
}

async function getOrderDetail(id) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (process.env.DB_HOST)
    return await axios
      .get(`${process.env.DB_HOST}/api/orders/${id}`, requestConfig)
      .then(handleResponse);
  else
    return await axios
      .get(`${backend_url}/api/orders/${id}`, requestConfig)
      .then(handleResponse);
}

async function logout() {
  localStorage.removeItem("user");

  // remove user from local storage to log user out
  if (process.env.DB_HOST)
    return await axios
      .post(`${process.env.DB_HOST}/api/auth/logout`)
      .then(handleResponse);
  else
    return await axios
      .post(`${backend_url}/api/auth/login`, body, requestConfig)
      .then(handleResponse);
}

async function getAll() {
  if (process.env.DB_HOST)
    return await axios
      .get(`${process.env.DB_HOST}/api/user`)
      .then(handleResponse);
  else
    return await axios
      .get(`${backend_url}/api/user`, requestConfig)
      .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`${process.env.DB_HOST}/api/users/${id}`, requestConfig)
    .then(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios
    .post(`${process.env.DB_HOST}/api/auth/register`, body, config)
    .then(handleResponse);
}

// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return fetch(`/api/users/${user.id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
  const data = response.data;

  if (response.status > 400 && error.response) {
    return Promise.reject(error);
  }

  return data;
}
