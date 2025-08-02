import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';

const API = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:5000' 
    : 'https://expense-splitter-9ox1.vercel.app', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
