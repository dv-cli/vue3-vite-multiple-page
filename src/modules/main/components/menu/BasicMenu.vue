<template>
  <n-menu
    :options="menuOptions"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    @update:value="handleUpdateValue"
  />
</template>

<script lang="ts">
/*global  Menu*/
import { defineComponent, h, Component, computed } from "vue";
import { NIcon, useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import { useGlobalStore } from "@main/store";
import { HomeOutline, AirplaneOutline } from "@vicons/ionicons5";

const iconComponents = { HomeOutline, AirplaneOutline };

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function renderLabel(menu: Menu.MenuOptions) {
  const { name, meta } = menu;
  return () => h(RouterLink as any, { to: { name, meta } }, { default: () => meta?.title });
}

function getNaiveMenuList(menuList: Menu.MenuOptions[]): MenuOption[] {
  let naiveMenuList: MenuOption[] = [];
  const getNaiveMenu: any = (menu: Menu.MenuOptions) => {
    const { meta, children, path } = menu;
    const icon: Component | undefined = Reflect.get(iconComponents, meta?.icon);
    return {
      label: children ? meta?.title : renderLabel(menu),
      key: path,
      icon: icon ? renderIcon(icon) : undefined,
      children: children ? children.map(child => getNaiveMenu(child)) : undefined,
    };
  };
  naiveMenuList = menuList.map(item => getNaiveMenu(item));
  return naiveMenuList;
}

export default defineComponent({
  props: {
    collapsed: Boolean,
  },
  setup() {
    const message = useMessage();

    const globalStore = useGlobalStore();
    const menuList = computed(() => globalStore.menuListGet);
    const menuOptions = computed(() => getNaiveMenuList(menuList.value));

    return {
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        message.info("[onUpdate:value]: " + JSON.stringify(key));
        message.info("[onUpdate:value]: " + JSON.stringify(item));
      },
    };
  },
});
</script>
