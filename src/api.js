// api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Use the correct named export
import { refreshAccessToken } from './utils/refresh';

// Declare Api first
const Api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Attach interceptor
Api.interceptors.request.use(async config => {
  let token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token); // Use jwtDecode correctly
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      token = await refreshAccessToken();
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Export Api
export default Api;


