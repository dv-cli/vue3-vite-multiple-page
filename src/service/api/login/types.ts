export interface LoginParams {
  userName: string;
  passWord: string | number;
}
export interface LoginApi {
  login: (params: LoginParams) => Promise<any>;
}
