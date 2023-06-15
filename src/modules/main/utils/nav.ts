import { ObjectType } from "@/service/api/interface";

/**
 * 递归获取keepAlive的组件name
 * @param menuList
 * @param keepAliveArr
 * @return array
 */
export function getKeepAliveRouterName(menuList: Menu.MenuOptions[], keepAliveArr: string[] = []) {
  menuList.forEach(menu => {
    menu.meta.isKeepAlive && menu.name && keepAliveArr.push(menu.name);
    menu.children?.length && getKeepAliveRouterName(menu.children, keepAliveArr);
  });
  return keepAliveArr;
}

/**
 * 得到一个path和路由的映射关系对象
 * @param menuList
 * @returns
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[]) {
  const breadcrumbObject: ObjectType = {};
  const loop = (menu: Menu.MenuOptions) => {
    if (menu.children?.length) {
      menu.children.forEach(item => loop(item));
    } else {
      breadcrumbObject[menu.path] = getCurrentBreadcrumb(menu.path, menuList);
    }
  };
  menuList.forEach(item => loop(item));
  return breadcrumbObject;
}

/**
 * 递归获取当前路由的面包屑对象
 * @param path
 * @param menuList
 * @return array
 */
export function getCurrentBreadcrumb(path: string, menuList: Menu.MenuOptions[]) {
  const currentNodes: Menu.MenuOptions[] = [];

  try {
    const getNode = (node: Menu.MenuOptions) => {
      currentNodes.push(node);
      if (path == node.path) throw new Error();
      if (node.children?.length) node.children.forEach(item => getNode(item));
      currentNodes.pop();
    };
    menuList.forEach(item => getNode(item));
  } catch (e) {
    return currentNodes;
  }
}
