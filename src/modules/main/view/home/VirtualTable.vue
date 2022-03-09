<script setup lang="ts">
import { h } from "vue";
import { NDataTable } from "naive-ui";
const columns: Array<any> = [
  {
    type: "selection",
    fixed: "left",
  },
  {
    title: "Name",
    key: "name",
    width: 200,
    fixed: "left",
  },
  {
    title: "Age",
    key: "age",
    width: 100,
    fixed: "left",
  },
  {
    title: "Row",
    key: "row",
    render(row: any, index: number) {
      return h("span", ["row ", index]);
    },
  },
  {
    title: "Row1",
    key: "row1",
    render(row: any, index: number) {
      return h("span", ["row ", index]);
    },
  },
  {
    title: "Row2",
    key: "row2",
    render(row: any, index: number) {
      return h("span", ["row ", index]);
    },
    width: 100,
    fixed: "right",
  },
  {
    title: "Address",
    key: "address",
    width: 200,
    fixed: "right",
  },
];
//@ts-ignore
const data = Array.apply(null, { length: 5000 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
}));
</script>

<template>
  <n-data-table
    ref="table"
    :columns="columns"
    :data="data"
    :max-height="250"
    :scroll-x="1800"
    virtual-scroll
  />
</template>
