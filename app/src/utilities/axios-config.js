import axios from 'axios';

const token = localStorage.getItem('_token') || '';

const baseURL = `${process.env.REACT_APP_API_HOST}/api/`;

const instance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

export default instance;
