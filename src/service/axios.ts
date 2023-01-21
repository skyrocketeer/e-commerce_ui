import axios from 'axios';
import { IStockData, UpdateStockDto } from '~types/stock';
import { isPublicRoute } from '~utils/helpers';
// import { useLogout } from '~hooks';

const Axios = axios.create();

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    if (!isPublicRoute) {
      // Do something before request is sent
      const token = localStorage.getItem('authToken') || '';

      // /* @ts-ignore */
      config.headers ? (config.headers['Authorization'] = token) : null;
    }
    config.baseURL = BASE_URL;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    if (
      error.response.status === 401 &&
      error.response.config.url !== '/api/auth/login'
    ) {
      // useLogout();
      window.location.href = '/auth/login';
      return;
    }
    return Promise.reject(error);
  }
);

export default Axios;

export const getStockList = (): Promise<{ data: IStockData[] | [] }> => {
  return axios
    .get(`${BASE_URL}/api/v1/stocks`)
    .then((res) => res.data)
    .catch((err) => console.log(err.data));
};

export const updateStock = (
  id: number,
  dto: UpdateStockDto
): Promise<{ data: IStockData }> => {
  return axios
    .put(`${BASE_URL}/api/v1/stock/${id}`, { data: dto })
    .then((res) => res.data)
    .catch((err) => console.log(err.data));
};
