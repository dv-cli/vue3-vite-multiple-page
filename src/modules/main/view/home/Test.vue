<script setup lang="ts">
import { userStore } from "@/modules/main/store/user";
import HelloWorld from "@/components/HelloWorld.vue";
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
    用户名：{{ user.name }}
    <br />
    长度：{{ user.nameLength }}
  </div>

  <NButton @click="updateName">修改store中的name</NButton>

  <router-link to="/login">Go to login</router-link>

  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>
