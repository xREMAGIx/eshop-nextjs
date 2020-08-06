import axios from "axios";
import setAuthToken from "../store/auth-header";

export const ratingService = {
  getAll,
  create,
  reply,
};

async function getAll(productId, url = null) {
  const requestConfig = {};

  const params =
    url === null
      ? `/api/products/${productId}/ratings`
      : `/api/products/${productId}/ratings` + url;

  return await axios
    .get(`${process.env.DB_HOST}${params}`, requestConfig)
    .then(handleResponse);
}

async function create(formData, token) {
  setAuthToken(token);

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(formData);

  const body = JSON.stringify(formData);

  return await axios
    .post(`${process.env.DB_HOST}/api/ratings`, body, requestConfig)
    .then(handleResponse);
}

async function reply(id, formData, token) {
  setAuthToken(token);

  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  return await axios
    .post(
      `${process.env.DB_HOST}/api/ratings/${id}/replies`,
      body,
      requestConfig
    )
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
