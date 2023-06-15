<script setup lang="ts">
import { userStore } from "@main/store/user";
import HelloWorld from "@main/view/example/HelloWorld.vue";
import { NButton } from "naive-ui";

const user = userStore();
const updateName = () => {
  user.$patch({
    name: "名称被修改了,nameLength也随之改变了",
  });
};
</script>

<template>
  <div>
    <div>
      用户名：{{ user.name }}
      <br />
      长度：{{ user.nameLength }}
    </div>

    <NButton @click="updateName">修改store中的name</NButton>

    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>
