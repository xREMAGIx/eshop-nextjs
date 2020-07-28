import axios from "axios";

export const bannerService = {
  getAll,
};

async function getAll() {
  const requestConfig = {};

  return await axios
    .get(`${process.env.DB_HOST}/api/banner`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status > 400 && error.response && error.response.data) {
    let errorkey = Object.keys(error.response.data)[0];

    let errorValue = error.response.data[errorkey][0];

    const error = errorkey.toUpperCase() + ": " + errorValue;
    return Promise.reject(error);
  }
  return data;
}
