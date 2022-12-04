import axios from "axios";
import { api } from "./config";
import { message } from "antd";

// default
axios.defaults.baseURL = api.API_URL;
// axios.defaults.baseURL = api.API_URL_DEV;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// credentials
// axios.defaults.withCredentials = true;

const urlRefreshToken = "/api/users/refresh-token";
// content type
const token = sessionStorage.getItem("authUser")
  ? sessionStorage.getItem("authUser")
  : null;
if (token) axios.defaults.headers.common["Authorization"] = token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    if (error.response.data.message === "invalid token") {
      message.error(`Please login to continue!`);
      setTimeout(() => {
        // window.location.replace("/logout");
      }, 3000);
    }

    return Promise.reject();
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = async (url, params) => {
    let response;
    let paramKeys = [];
    const token = sessionStorage.getItem("authUser")
      ? sessionStorage.getItem("authUser")
      : null;
    if (token) axios.defaults.headers.common["Authorization"] = token;
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });
      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      await axios
        .get(`${url}?${queryString}`, params)
        .then(function (res) {
          response = res;
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      await axios
        .get(`${url}`, params)
        .then(function (res) {
          response = res;
        })
        .catch(function (error) {
          if (error === "Request failed with status code 401") {
            axios
              .post(`${urlRefreshToken}`, null)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
    return response;
  };
  /**
   * post given data to url
   */
  post = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };

  createWithFormData = (url, data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return axios.post(url, formData, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  };

  updateWithFormData = (url, data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return axios.put(url, formData, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
