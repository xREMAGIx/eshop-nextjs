//import { authHeader } from "../helpers";
import axios from "axios";

export const cartService = {
  getAll,
  addItem,
  //   update,
  //   delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios
    .get(`http://localhost:5000/api/cart`, requestConfig)
    .then(handleResponse);
}

async function addItem(productId) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };
  return await axios
    .put(`http://localhost:5000/api/cart/${productId}`, requestConfig)
    .then(handleResponse);
}

//   if (imageData.get("image")) {
//     let res;
//     try {
//       res = await axios.post(`/api/categories`, body, requestConfig);
//     } catch (error) {
//       console.log(error);
//     }

//     const configFormData = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     try {
//       return await axios
//         .put(
//           "/api/categories/" + res.data.data._id + "/image",
//           imageData,
//           configFormData
//         )
//         .then(handleResponse);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     return await axios
//       .post("/api/categories", body, requestConfig)
//       .then(handleResponse);
//   }
// }

// async function update(id, category, image) {
//   const imageData = new FormData();
//   imageData.append("image", image);

//   const requestConfig = {
//     headers: {
//       //authHeader(),
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify(category);
//   console.log(body);

//   if (imageData.get("image")) {
//     try {
//       await axios.put(`/api/categories/${id}`, body, requestConfig);
//     } catch (error) {
//       console.log(error);
//     }

//     const configFormData = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     try {
//       return await axios
//         .put("/api/categories/" + id + "/image", imageData, configFormData)
//         .then(handleResponse);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     return await axios
//       .put(`/api/categories/${id}`, body, requestConfig)
//       .then(handleResponse);
//   }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// async function _delete(id) {
//   const requestConfig = {
//     // headers: authHeader()
//   };

//   return await axios
//     .delete(`/api/categories/${id}`, requestConfig)
//     .then(handleResponse);
// }

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
