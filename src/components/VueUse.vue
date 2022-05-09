<template>
  <h3>VueUse简单使用示例</h3>
  <div>
    <div>鼠标指针当前的坐标：</div>
    X：{{ x }};Y：{{ y }}
  </div>
  <div>usePreferredDark判断用户是否设置了浏览器深色主题：{{ isDark }}</div>
  <div>useLocalStorage存储api：{{ store }}</div>
</template>

<script lang="ts">
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // tracks mouse position
    const { x, y } = useMouse();

    // is user prefers dark theme
    const isDark = usePreferredDark();

    // persist state in localStorages
    const store = useLocalStorage("my-storage", {
      name: "Apple",
      color: "red",
    });
    return { x, y, isDark, store };
  },
});
</script>
