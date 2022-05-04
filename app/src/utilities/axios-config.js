import axios from 'axios';

const token = localStorage.getItem('token') || '';

const baseURL = 'http://localhost:5000/api/';

const instance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

export default instance;
