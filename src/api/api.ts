import axios, { AxiosRequestConfig } from 'axios';
import { authAPI } from '@api/authApi';


const LocalBaseURL = `http://localhost:7000/api/`;
const ServerBaseURL = `https://wg-force3-backend.herokuapp.com/api/`;
const ServerAuthBaseURL = `https://wg-server-auth.herokuapp.com/api/`;

export const baseURL = LocalBaseURL;

const instance = axios.create({
  baseURL,
 // withCredentials: false,
  withCredentials: true,
} as AxiosRequestConfig);


instance.interceptors.request.use((config) => {
  if(config.headers){
    config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    return config
  }
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    return Promise.reject(error)
  }
)

instance.interceptors.response.use((config) => {
  return config
}, async error => {
  const originalRequest = error.config
  if (error.response.status === 401) {
    try {
      const data = await authAPI.refresh()
      localStorage.setItem('token', data.accessToken);
      return instance.request(originalRequest)
    } catch (e) {
      console.log("не авторизован в интерсепторе")
    }

  }
})








export default instance;
