import http from "@/service/http";
import { LoginApi } from "./types";

const loginApi: LoginApi = {
  login(params) {
    return http.post("/login", params);
  },
};
export default loginApi;
