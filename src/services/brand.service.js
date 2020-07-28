//import { authHeader } from "../helpers";
import axios from "axios";

export const brandService = {
  getAll,
  getById,
};

async function getAll(url = null) {
  const requestConfig = {};

  const params = url === null ? `/api/brands` : `/api/brands` + url;

  return await axios
    .get(`${process.env.DB_HOST}${params}`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {};
  return await axios
    .get(`${process.env.DB_HOST}/api/brands/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;

  if (response.status > 400 && error.response && error.response.data) {
    let errorkey = Object.keys(error.response.data)[0];

    let errorValue = error.response.data[errorkey][0];

    const error = errorkey.toUpperCase() + ": " + errorValue;
    return Promise.reject(error);
  }
  return data;
}
