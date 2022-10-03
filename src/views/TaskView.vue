<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/store/task";
import TaskPopup from "../components/TaskPopup.vue";

const taskStore = useTaskStore();
const { LIST } = taskStore;

function init() {
  getAllTask();
}

async function getAllTask() {
  await taskStore[taskStore.ActionType.GET_ALL_TASK]();
}

function onAddClick() {
  taskStore[taskStore.ActionType.SET_VIEW]({
    visible: true,
    id: null,
  });
}

function onRowClick(item) {
  taskStore[taskStore.ActionType.SET_VIEW]({
    visible: true,
    id: item._id,
  });
}

init();
</script>
<template>
  <main>
    <b-button variant="primary" @click="onAddClick">추가</b-button>
    <b-table
      dark
      striped
      hover
      sticky-header="true"
      :items="LIST"
      @row-clicked="onRowClick"
    ></b-table>
    <TaskPopup></TaskPopup>
  </main>
</template>
<style lang="scss" scoped></style>
