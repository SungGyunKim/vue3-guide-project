<script setup>
import { onBeforeMount } from "vue";
import { useTaskStore } from "@/store/task";
import TaskPopup from "../components/TaskPopup.vue";

/**********************************************************
 * 컴포넌트 props, emits, expose 정의
 **********************************************************/
const props = defineProps({});
const emits = defineEmits([]);
defineExpose({});

/**********************************************************
 * 컴포넌트 state
 **********************************************************/
const taskStore = useTaskStore();
const { LIST } = taskStore;

/**********************************************************
 * 컴포넌트 라이프사이클 훅
 **********************************************************/
onBeforeMount(async () => {
  await taskStore[taskStore.ActionType.GET_ALL_TASK]();
});

/**********************************************************
 * 컴포넌트 이벤트 핸들러
 **********************************************************/
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

/**********************************************************
 * 일반 함수
 **********************************************************/
</script>
<template>
  <b-container fluid>
    <b-row>
      <b-col> {{ taskStore[taskStore.GetterType.COMPLETED_COUNT] }} </b-col>
      <b-col> {{ taskStore[taskStore.GetterType.INCOMPLETE_COUNT] }} </b-col>
    </b-row>
    <b-row align-h="end" class="mt-2 mb-2">
      <b-col cols="auto">
        <b-button variant="primary" @click="onAddClick">추가</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          dark
          striped
          hover
          sticky-header="true"
          :items="LIST"
          @row-clicked="onRowClick"
        ></b-table>
      </b-col>
    </b-row>
  </b-container>
  <TaskPopup></TaskPopup>
</template>
<style lang="scss" scoped></style>
