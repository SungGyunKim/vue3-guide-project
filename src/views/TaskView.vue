<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/store/task";
import TaskPopup from "../components/TaskPopup.vue";

const taskPopupVisible = ref(false);
const taskStore = useTaskStore();
const { LIST } = taskStore;

await taskStore[taskStore.ActionType.GET_ALL_TASK]();

function onAddClick() {
  taskPopupVisible.value = true;
}

function onRowClick(item) {
  taskPopupVisible.value = true;
}
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
    <TaskPopup :visible="taskPopupVisible"></TaskPopup>
  </main>
</template>
<style lang="scss" scoped></style>
