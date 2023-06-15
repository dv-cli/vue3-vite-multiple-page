/**
 * 递归树形转列表
 * @param menuList
 * @returns
 */
export function treeToList(menuList: Menu.MenuOptions[]) {
  if (!Array.isArray(menuList)) return;
  const result: Menu.MenuOptions[] = [];
  const dfs = (tree: Menu.MenuOptions[]) => {
    tree.forEach(item => {
      result.push(item);
      if (item.children) {
        dfs(item.children);
        Reflect.deleteProperty(item, "children");
      }
    });
  };
  dfs(menuList);
  return result;
}
