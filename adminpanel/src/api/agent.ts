import axios, { AxiosResponse } from 'axios';

import { PaginationDto } from '../models/Common';
import { Product } from '../models/Product';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;

if (!apiUrl) {
  throw new Error('Environment variable for domain api not provided');
}

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

axiosInstance.interceptors.response.use(async (response) => {
  await sleep(1000);
  return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const products = {
  list: (page: number, pageSize: number) =>
    axiosInstance
      .get<PaginationDto<Product>>('/products', { params: { page, pageSize } })
      .then(responseBody),
  details: (id: string) =>
    axiosInstance.get<Product>(`/products/${id}`).then(responseBody),
  create: (product: Product) => axiosInstance.post<void>(`/products`, product),
  update: (product: Product) =>
    axiosInstance
      .put<void>(`/products/${product.id}`, product)
      .then(responseBody),
  delete: (id: string) =>
    axiosInstance.delete<void>(`/products/${id}`).then(responseBody),
};

export const agent = {
  products,
};
