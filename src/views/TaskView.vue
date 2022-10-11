<script setup>
import { onBeforeMount } from "vue";
import { useTaskStore } from "@/store/task";
import TaskPopup from "@/components/popups/TaskPopup.vue";
import TaskFilterComponent from "@/components/TaskFilterComponent.vue";

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
const { FILTERED_LIST } = taskStore;

/**********************************************************
 * 컴포넌트 라이프사이클 훅
 **********************************************************/
onBeforeMount(async () => {
  await taskStore.getAllTask();
});

/**********************************************************
 * 컴포넌트 이벤트 핸들러
 **********************************************************/
function onSetStateClick() {
  taskStore.$patch({
    VIEW: {
      visible: true,
      id: null,
    },
  });
}

function onResetStateClick() {
  taskStore.$reset([taskStore.StateType.LIST]);
}

function onAddClick() {
  taskStore.$patch({
    VIEW: {
      visible: true,
      id: null,
    },
  });
}

function onRowClick(item) {
  taskStore.$patch({
    VIEW: {
      visible: true,
      id: item._id,
    },
  });
}

/**********************************************************
 * 일반 함수
 **********************************************************/
</script>
<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col>
        <TaskFilterComponent></TaskFilterComponent>
      </b-col>
    </b-row>
    <b-row align-h="end" class="mt-2">
      <b-col cols="auto" class="btn-area">
        <b-button variant="primary" @click="onSetStateClick">SET</b-button>
        <b-button variant="primary" @click="onResetStateClick">RESET</b-button>
        <b-button variant="primary" @click="onAddClick">추가</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <b-table
          dark
          striped
          hover
          sticky-header="true"
          :items="FILTERED_LIST"
          @row-clicked="onRowClick"
          responsive="lg"
        ></b-table>
      </b-col>
    </b-row>
  </b-container>
  <TaskPopup></TaskPopup>
</template>
<style scoped>
.btn-area button {
  margin-right: 10px;
}

.btn-area button:last-child {
  margin-right: 0px;
}
</style>
