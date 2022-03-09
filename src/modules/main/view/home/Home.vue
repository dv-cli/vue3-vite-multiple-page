<script setup lang="ts">
import { h, ref } from "vue";
import { RouterLink } from "vue-router";

import { NIcon, NSpace, NMenu, NLayout, NLayoutSider } from "naive-ui";
import { BookOutline as BookIcon } from "@vicons/ionicons5";

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const inverted = ref(false);
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "VirtualTable",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "VirtualTable" }
      ),
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Test",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "1973年的弹珠玩具" }
      ),
    key: "pinball-1973",
    icon: renderIcon(BookIcon),
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "VueUse",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "舞，舞，舞" }
      ),
    key: "dance-dance-dance",
    icon: renderIcon(BookIcon),
  },
];
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <router-view />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>
