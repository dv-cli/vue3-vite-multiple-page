const MenuResult = {
  code: "200",
  data: [
    {
      path: "/home/index",
      name: "Home",
      component: "/layout/PageLayout",
      meta: {
        icon: "HomeOutline",
        title: "首页",
      },
    },
    {
      path: "/example",
      name: "Example",
      component: "/layout/PageLayout",
      meta: {
        icon: "AirplaneOutline",
        title: "演示示例",
      },
      children: [
        {
          path: "/example/virtual-table",
          name: "VirtualTable",
          component: "/example/VirtualTable",
          meta: {
            title: "虚拟滚动表格",
          },
        },
        {
          path: "/example/test111",
          name: "Test1",
          component: "/example/Test",
          meta: {
            title: "测试111",
          },
        },
        {
          path: "/example/vue-use",
          name: "VueUse",
          component: "/example/VueUse",
          meta: {
            title: "VueUse用例",
          },
        },
        {
          path: "/example/hello-world",
          name: "HelloWorld",
          component: "/example/HelloWorld",
          meta: {
            title: "HelloWorld",
          },
        },
      ],
    },
  ],
  msg: "成功",
};

export { MenuResult };
