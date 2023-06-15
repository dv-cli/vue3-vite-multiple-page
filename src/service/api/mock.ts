import http from "@/service";
import { LoginParams, ObjectType } from "./interface";

const loginApi = (params: LoginParams) => http.post("/login", params);

const getMenuListApi = (params?: ObjectType) => http.get("/menu", params);

export { loginApi, getMenuListApi };
