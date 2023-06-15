<template>
  <nav>
    <div class="nav-left">
      <Breadcrumb />
    </div>
    <div class="nav-right">
      <n-button class="r16" text @click="toggleTheme">{{ isNight ? "深色" : "浅色" }}</n-button>
      <SvgIcon
        class="r16"
        :name="isFullscreen ? 'exit-full-screen' : 'full-screen'"
        @click="toggleScreen"
      />

      <n-dropdown :options="options" @select="handleSelect">
        <n-icon class="r16"><Language /></n-icon>
      </n-dropdown>
    </div>
  </nav>
</template>

<script lang="ts">
import Breadcrumb from "./components/Breadcrumb.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { Language } from "@vicons/ionicons5";
import { defineComponent, ref, nextTick } from "vue";
import { useGlobalStore } from "@main/store";
import NProgress from "@/components/nprogress";
import { useMessage } from "naive-ui";
import type { DropdownOption } from "naive-ui";

export default defineComponent({
  components: {
    SvgIcon,
    Language,
    // GameControllerOutline,
    Breadcrumb,
  },
  setup() {
    const options = [
      { key: "zhCN", label: "中文 Chinese" },
      { key: "enUS", label: "英文 English" },
    ];
    const message = useMessage();

    const globalStore = useGlobalStore();
    const isFullscreen = ref<Boolean>(false);
    const isNight = ref<Boolean>(false);
    const toggleScreen = () => {
      isFullscreen.value = !isFullscreen.value;
      globalStore.toggleFullScreen();
    };
    const toggleTheme = () => {
      NProgress.start();
      isNight.value = !isNight.value;
      globalStore.themeValue = isNight.value ? "light" : "dark";
      nextTick(() => NProgress.done());
    };

    const handleSelect = (key: string | number, options: DropdownOption) => {
      message.info(String(key) + JSON.stringify(options));

      globalStore.changeLanguage(String(key));
    };
    return {
      toggleScreen,
      toggleTheme,
      handleSelect,
      isFullscreen,
      isNight,
      options,
    };
  },
});
</script>

<style lang="less" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  .nav-left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
  .nav-right {
    font-size: 20px;
    padding: 8px;
    margin-right: 36px;
    display: flex;
    align-items: center;
    .r16 {
      margin-right: 16px;
    }
  }
}
</style>
