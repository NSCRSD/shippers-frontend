// utils/refresh.js
import axios from 'axios';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const res = await axios.post('/auth/refresh', { token: refreshToken });
    const newAccessToken = res.data.accessToken;
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (err) {
    localStorage.clear();
    window.location.href = '/login';
  }
};
