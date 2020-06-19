//import { authHeader } from "../_helpers";
import axios from "axios";
import backendUrl from "../src/backendUrl";

export const bannerService = {
  getAll,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios
    .get(`${backendUrl}/api/banner`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
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
