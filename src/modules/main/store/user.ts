import { defineStore } from "pinia";

export const userStore = defineStore({
  id: "user",
  state: () => ({
    name: "超级管理员",
  }),
  getters: {
    nameLength: state => state.name.length,
  },
  actions: {},
});
