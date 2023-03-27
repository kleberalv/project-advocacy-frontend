import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: 'http://192.168.1.11:8080/api',
});

export default api;