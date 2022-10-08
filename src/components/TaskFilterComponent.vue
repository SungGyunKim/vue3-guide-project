<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/store/task";

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

/**********************************************************
 * 컴포넌트 라이프사이클 훅
 **********************************************************/

/**********************************************************
 * 컴포넌트 이벤트 핸들러
 **********************************************************/
function onFilterAllClick() {
  taskStore.$patch({
    [taskStore.StateType.FILTER]: "all",
  });
}

function onFilterFinishedClick() {
  taskStore.$patch({
    [taskStore.StateType.FILTER]: "finished",
  });
}

function onFilterUnfinishedClick() {
  taskStore.$patch({
    [taskStore.StateType.FILTER]: "unfinished",
  });
}

/**********************************************************
 * 일반 함수
 **********************************************************/
</script>
<template>
  <div>
    <b-button variant="secondary" class="me-2" @click="onFilterAllClick">
      전체
      <b-badge variant="light">{{
        taskStore[taskStore.GetterType.TOTAL_COUNT]
      }}</b-badge>
    </b-button>
    <b-button variant="primary" class="me-2" @click="onFilterFinishedClick">
      완료
      <b-badge variant="light">{{
        taskStore[taskStore.GetterType.COMPLETED_COUNT]
      }}</b-badge>
    </b-button>
    <b-button variant="danger" @click="onFilterUnfinishedClick">
      미완료
      <b-badge variant="light">{{
        taskStore[taskStore.GetterType.INCOMPLETE_COUNT]
      }}</b-badge>
    </b-button>
  </div>
</template>
<style scoped></style>
