<template>
  <div style="height: 100%; position: relative">
    <n-layout has-sider position="absolute">
      <n-layout-sider
        bordered
        :width="208"
        :native-scrollbar="false"
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-layout-header bordered>
          <img src="@/assets/logo.png" alt="logo" />
          <h2 v-show="!collapsed">太古里</h2>
        </n-layout-header>
        <BasicMenu :collapsed="collapsed" />
      </n-layout-sider>

      <n-layout>
        <n-layout-header style="height: 64px" bordered>
          <BasicHeader />
        </n-layout-header>
        <n-layout
          position="absolute"
          style="top: 64px; bottom: 32px"
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </n-layout>
        <n-layout-footer bordered position="absolute" style="height: 32px; line-height: 32px">
          城府路
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BasicMenu } from "@main/components/menu";
import { BasicHeader } from "@main/components/header";

const collapsed = ref(false);
</script>

<style lang="less" scoped>
:deep(.n-layout-sider) {
  .n-layout-header {
    height: 64px;
    padding: 8px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & > img {
      height: 32px;
      width: 32px;
      margin-right: 8px;
    }
  }
}
</style>
