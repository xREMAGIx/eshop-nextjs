//import { authHeader } from "../helpers";
import axios from "axios";
import backendUrl from "../src/backendUrl";

export const productService = {
  getAll,
  getById,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };
  return await axios
    .get(`${backendUrl}/api/products`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`${backendUrl}/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status !== 200) {
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
