import axios from "axios";

const remoteApi = axios.create({
  baseURL: process.env.NODE_ENV === `development` ? `http://localhost:18010/api` : `https://blackpage.azurewebsites.net/api`,
  responseType: "json",
});

let verification = localStorage.getItem("verification");

if (verification) {
    remoteApi.defaults.headers.common = { Authorization: "Bearer " + verification };
}

export default remoteApi;
