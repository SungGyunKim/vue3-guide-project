<script setup>
import { computed } from "vue";
import { useTaskStore } from "@/store/task";

const items = computed(() => [
  { isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
  { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
  { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
  { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
]);

const taskStore = useTaskStore();

const taskState = {
  ...taskStore.useState([taskStore.StateType.LIST]),
  ...taskStore.useGetters([taskStore.GetterType.COMPLETED_COUNT]),
};

const taskActions = {
  ...taskStore.useActions([taskStore.ActionType.GET_ALL_TASK]),
};

await taskActions[taskStore.ActionType.GET_ALL_TASK]();
</script>
<template>
  <main>
    <b-table striped hover :items="items"></b-table>
    {{ taskState[taskStore.StateType.LIST] }}

    <div
      v-for="(item, index) in taskState[taskStore.StateType.LIST]"
      :key="index"
    >
      {{ item }}
    </div>
  </main>
</template>
<style lang="scss" scoped></style>
