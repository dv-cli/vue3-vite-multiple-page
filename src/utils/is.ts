/**
 * 判断是否是函数
 * @param val
 * @returns
 */
export function isFunction(val: any): val is string {
  return typeof val === "function";
}
