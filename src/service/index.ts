import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosCanceler } from "./helper/axios-cancel";
import { ResultData } from "@/service/api/interface";
import { ResultEnum } from "./helper/enum";
import { checkStatus } from "./helper/check-status";
import { createDiscreteApi } from "naive-ui";

const { message } = createDiscreteApi(["message"]);

const axiosCanceler = new AxiosCanceler();

console.log(import.meta.env.VITE_API_URL);

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config);

        return { ...config, headers: { ...config.headers } };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     *
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        // * 在请求结束后，移除本次请求，并关闭请求 loading
        axiosCanceler.removePending(config);
        // * 登陆失效
        if (data.code == ResultEnum.OVERDUE) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code != ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) message.error("请求超时！请您稍后重试");
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);

        return Promise.reject(error);
      }
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
