import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

export const getLoggedInUser = () => {
  const user = sessionStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

//auth
export const login = (data) => {
  return api.post(url.API_LOGIN, data);
};

//App score-prediction
export const postMatches = (data) => {
  return api.post(url.API_MATCHES, data);
};

export const getDataPredictionByDate = (data) => {
  return api.post(url.API_MATCHSCORE_GET_DATE, data);
};

export const getAllDataPrediction = (data) => {
  return api.get(url.API_V1_MATCHSCORE_GET_ALL, data);
};

export const getAllDataMatch = (data) => {
  return api.get(url.API_V1_MATCH_GET_ALL, data);
};
