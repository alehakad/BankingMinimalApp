import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log(apiUrl);


const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/',
});

export default api;