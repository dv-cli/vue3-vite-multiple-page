<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key="breadcrumb.path">
      <!-- <SvgIcon name="collapse-left" /> -->
      <n-icon
        size="18"
        :component="breadcrumb.meta.icon ? icons[breadcrumb.meta.icon] : icons['Home']"
      />
      {{ breadcrumb.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed, Component } from "vue";
import { useRoute } from "vue-router";
import { Home, AirplaneOutline, HomeOutline } from "@vicons/ionicons5";
import { useGlobalStore } from "@main/store";

const icons: { [key: string]: Component } = { Home, AirplaneOutline, HomeOutline };

export default defineComponent({
  setup() {
    const route = useRoute();
    const globalStore = useGlobalStore();
    const breadcrumbList = computed(() => globalStore.breadcrumbObjectGet[route.path]);

    return {
      icons,
      breadcrumbList,
    };
  },
});
</script>
