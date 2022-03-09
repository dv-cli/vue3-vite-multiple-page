import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

axios.defaults.baseURL = "/";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

/** 请求拦截器 */

axios.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const token = window.sessionStorage.getItem("token");

    if (token)
      //@ts-ignore
      config.headers.token = token;
  },
  error => {
    return error;
  }
);

axios.interceptors.response.use(res => {
  if (res.data.code == "999") {
    // token过期了
    sessionStorage.setItem("token", "");
  }
  return res;
});

interface ResType<T> {
  code: number;
  data?: T;
  msg: string;
  err?: string;
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params: unknown): Promise<ResType<T>>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .get(url, { params })
        .then(res => {
          NProgress.done();
          resolve(res.data);
        })
        .catch(err => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, JSON.stringify(params))
        .then(res => {
          NProgress.done();
          resolve(res.data);
        })
        .catch(err => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res => {
          NProgress.done();
          resolve(res.data);
        })
        .catch(err => {
          NProgress.done();
          reject(err.data);
        });
    });
  },
  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
