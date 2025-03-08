import axios from 'axios';

const AxiosPublic = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const AxiosPrivate = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export { AxiosPrivate, AxiosPublic };
