<script setup>
import { reactive, onUpdated, toRefs } from "vue";
import { useTaskStore } from "@/store/task";

/**********************************************************
 * 컴포넌트 준비 작업
 **********************************************************/
const props = defineProps({});
const emits = defineEmits([]);
defineExpose({});
const taskStore = useTaskStore();
const { VIEW, TASK } = taskStore;

/**********************************************************
 * 컴포넌트 라이프사이클 훅
 **********************************************************/
onUpdated(async () => {
  if (VIEW.value.id) {
    await getTaskById(VIEW.value.id);
  }
});

// state
let taskData = reactive({
  owner: "",
  id: "",
  description: "",
  completed: false,
});

const taskDataState = reactive({
  descriptionState: null,
});

async function getTaskById(id) {
  await taskStore[taskStore.ActionType.GET_TASK_BY_ID]({
    id,
  });
}

function onSaveClick() {}

function onCancelClick() {
  close();
}

function close() {
  taskStore[taskStore.ActionType.SET_VIEW]({
    visible: false,
  });
}
</script>

<template>
  <b-modal v-model="VIEW.visible" size="lg" scrollable centered>
    <!-- title area -->
    <template #title> Task 등록/수정 팝업 </template>
    <!-- content area -->
    <template #default="">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Task ID -->
        <b-form-group label="Task ID" label-for="task-id-input">
          <b-form-input
            id="task-id-input"
            v-model="TASK._id"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 소유자 -->
        <b-form-group label="소유자" label-for="owner-input">
          <b-form-input
            id="owner-input"
            v-model="TASK.owner"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 생성일 -->
        <b-form-group label="생성일" label-for="owner-input">
          <b-form-input
            id="owner-input"
            v-model="TASK.createdAt"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 수정일 -->
        <b-form-group label="수정일" label-for="owner-input">
          <b-form-input
            id="owner-input"
            v-model="TASK.updatedAt"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 설명 -->
        <b-form-group
          label="설명"
          label-for="description-input"
          invalid-feedback="설명은 필수입니다."
          :state="taskDataState.descriptionState"
        >
          <b-form-input
            id="description-input"
            v-model="TASK.description"
            :state="taskDataState.descriptionState"
            required
            placeholder="할 일에 대한 설명을 입력하세요."
          ></b-form-input>
        </b-form-group>
        <!-- 완료 여부 -->
        <b-form-group label="완료 여부" label-for="completed-input">
          <b-form-checkbox
            id="completed-input"
            v-model="TASK.completed"
            required
            switch
            size="lg"
          >
            {{ TASK.completed ? "완료" : "미완료" }}
          </b-form-checkbox>
        </b-form-group>
      </form>
    </template>
    <template #footer>
      <b-button size="sm" variant="success" @click="onSaveClick()">
        저장
      </b-button>
      <b-button size="sm" variant="danger" @click="onCancelClick()">
        취소
      </b-button>
    </template>
  </b-modal>
</template>

<style scoped></style>
