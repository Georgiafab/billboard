import axios, { AxiosResponse } from "axios";
// import { getCookie } from "./utils";
import https from "https";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: "text-api",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",

    // "X-Csrftoken": "6LzQwYoCQeOuvDs1zkvGhAtNpCJbijGq",
  },
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // 忽略自签名证书
  }),
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token =
    //   typeof window !== "undefined" ? getCookie("next-auth.csrf-token") : null;
    // console.log(token, "next-auth.csrf-token");
    // if (token) {
    //   // config.headers["X-Csrftoken"] = token;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const {
      data: { code, message, data },
      status,
    } = response;
    if (status === 200 && code === 200) {
    } else {
      // typeof window !== "undefined" && Message.error(message);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // typeof window !== "undefined" && Message.error(error.message);
      // 处理未授权错误，比如跳转到登录页
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
