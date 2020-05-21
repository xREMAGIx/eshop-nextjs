//import { authHeader } from "../helpers";
import axios from "axios";

export const brandService = {
  getAll,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios
    .get(`http://localhost:5000/api/brands`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    headers: authHeader(),
  };
  return await axios
    .get(`/api/brands/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(brand, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(brand);
  console.log(body);

  if (imageData.get("image")) {
    let res;
    try {
      res = await axios.post(`/api/brands`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .put(
          "/api/brands/" + res.data.data._id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .post("/api/brands", body, requestConfig)
      .then(handleResponse);
  }
}

async function update(id, brand, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(brand);
  console.log(body);

  if (imageData.get("image")) {
    try {
      await axios.put(`/api/brands/${id}`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .put("/api/brands/" + id + "/image", imageData, configFormData)
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`/api/brands/${id}`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`/api/brands/${id}`, requestConfig)
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
