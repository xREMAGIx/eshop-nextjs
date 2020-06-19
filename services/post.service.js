//import { authHeader } from "../helpers";
import axios from "axios";
import backendUrl from "../src/backendUrl";

export const postService = {
  getAll,
  getById,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios
    .get(`${backendUrl}/api/posts`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`${backendUrl}/api/posts/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status > 400) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
