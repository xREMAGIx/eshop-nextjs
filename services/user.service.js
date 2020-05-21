import axios from "axios";
import setAuthToken from "../helpers/auth-header";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  getMe,
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`http://localhost:5000/api/auth/login`, body, requestConfig)
    .then(handleResponse);
}

async function getMe(token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .get(`http://localhost:5000/api/auth/me`, requestConfig)
    .then(handleResponse);
}

async function logout() {
  // remove user from local storage to log user out
  await axios.post("http://localhost:5000/api/auth/logout");
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    //headers: authHeader(),
  };

  return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    //headers: authHeader(),
  };

  return fetch(`/api/users/${id}`, requestOptions)
    .then(handleResponse)
    .catch(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios
    .post("http://localhost:5000/api/auth/register", body, config)
    .then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/api/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.log(response);
  let data;
  data = response.data;

  if (response.status === 404) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
