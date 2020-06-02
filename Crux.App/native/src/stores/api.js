import axios from 'axios';

const remoteApi = axios.create({
    baseURL: `http://localhost:18010/api`,
    responseType: 'json'
});

let verification = "";

if (verification) {
    remoteApi.defaults.headers.common = { 'Authorization': "Bearer " + verification };
}

export default remoteApi;