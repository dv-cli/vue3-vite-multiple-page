<template>
  <n-config-provider
    :theme="theme"
    :locale="localeData.locale"
    :date-locale="localeData.dateLocale"
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { darkTheme, lightTheme, zhCN, enUS, dateZhCN, dateEnUS } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { useGlobalStore } from "./store";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const themes: Record<string, GlobalTheme> = { dark: darkTheme, light: lightTheme };
    const globalStore = useGlobalStore();
    const { themeValue, language } = storeToRefs(globalStore);

    const localeData = computed(() => {
      return language.value == "enUS"
        ? { locale: enUS, dateLocale: dateEnUS }
        : { locale: zhCN, dateLocale: dateZhCN };
    });

    return {
      darkTheme,
      lightTheme,
      theme: computed(() => themes[themeValue.value]),
      themeValue,
      localeData,
    };
  },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .n-config-provider {
    height: 100%;
  }
}
.test {
  color: @test-color;
}
</style>
