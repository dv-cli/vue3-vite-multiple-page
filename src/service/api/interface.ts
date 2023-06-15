export interface LoginParams {
  userName: string;
  passWord: string | number;
}

export interface ObjectType {
  [key: string]: any;
}

export interface Result {
  code: string;
  msg: string;
}

export interface ResultData<T = any> extends Result {
  data: T;
}
