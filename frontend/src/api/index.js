import globalAxios from "axios";
import {
  AccountApi,
  AuthenticationApi,
  InvoiceApi,
  MetalApi,
  ProductApi,
  WarrantyApi,
} from "./v1/src";
const responseInterceptor = (response) => {
  /**
   * Add logic for successful response
   */
  return response?.data || {};
};
const responseErrorInterceptor = async (error) => {
  return Promise.reject(error);
};

globalAxios.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

const accountApi = new AccountApi();
const metalApi = new MetalApi();
const productApi = new ProductApi();
const invoiceApi = new InvoiceApi();
const warrantyApi = new WarrantyApi();
const authenticationApi = new AuthenticationApi();
const mergeApis = (...apis) => {
  const mergedApi = {};
  apis.forEach((api) => {
    const proto = Object.getPrototypeOf(api);
    const keys = Object.getOwnPropertyNames(proto);

    keys.forEach((key) => {
      // Kiểm tra xem thuộc tính có phải là một phương thức không
      if (key !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor && typeof descriptor.value === "function") {
          mergedApi[key] = descriptor.value.bind(api);
        } else if (!mergedApi[key]) {
          mergedApi[key] = api[key];
        }
      }
    });
  });
  return mergedApi;
};

const api = mergeApis(
  accountApi,
  metalApi,
  productApi,
  warrantyApi,
  authenticationApi,
  invoiceApi
);
export default api;
