import axios, { AxiosRequestConfig } from 'axios';

const backEndBaseURL = `https://wg-force3-backend.herokuapp.com/api/`;
const geoLocBaseURL = 'https://eu1.locationiq.com/v1/';
const ipLocBaseURL = 'http://ipwhois.app/json/';

const backEndInstance = axios.create({
  baseURL: backEndBaseURL,
  withCredentials: false,
} as AxiosRequestConfig);

const geoLocInstance = axios.create({
  baseURL: geoLocBaseURL,
});

const ipLocInstance = axios.create({
  baseURL: ipLocBaseURL,
});

export { backEndInstance, geoLocInstance, ipLocInstance };
