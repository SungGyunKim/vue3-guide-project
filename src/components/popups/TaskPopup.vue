<script setup>
import { onUpdated, ref } from "vue";
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
const initialState = {
  taskData: {},
  taskDataState: {
    descriptionState: null,
  },
};
const taskStore = useTaskStore();
const { view, task } = taskStore;
const taskData = ref(initialState.taskData);
const taskDataState = ref(initialState.taskDataState);

/**********************************************************
 * 컴포넌트 라이프사이클 훅
 **********************************************************/
onUpdated(async () => {});

/**********************************************************
 * 컴포넌트 이벤트 핸들러
 **********************************************************/
async function onModalShow() {
  if (view.value.id) {
    await taskStore.getTaskById({
      id: view.value.id,
    });
    taskData.value = { ...task.value };
  }
}

async function onSaveClick() {
  if (view.value.id) {
    await taskStore.updateTaskById(taskData.value);
  } else {
    await taskStore.addTask(taskData.value);
  }

  await taskStore.getAllTask();

  close();
}

async function onDeleteClick() {
  await taskStore.deleteTaskById(taskData.value._id);
  await taskStore.getAllTask();

  close();
}

function onCancelClick() {
  close();
}

/**********************************************************
 * 일반 함수
 **********************************************************/
function close() {
  taskData.value = initialState.taskData;
  taskDataState.value = initialState.taskDataState;

  taskStore.$patch({
    task: {},
    view: {
      visible: false,
      id: null,
    },
  });
}
</script>

<template>
  <b-modal
    v-model="view.visible"
    size="lg"
    scrollable
    centered
    @show="onModalShow"
  >
    <!-- title area -->
    <template #title> Task {{ view.id ? "수정" : "등록" }} 팝업 </template>
    <!-- content area -->
    <template #default>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Task ID -->
        <b-form-group label="Task ID" label-for="task-id-input" v-if="view.id">
          <b-form-input
            id="task-id-input"
            v-model="taskData._id"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 소유자 -->
        <b-form-group label="소유자" label-for="owner-input" v-if="view.id">
          <b-form-input
            id="owner-input"
            v-model="taskData.owner"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 생성일 -->
        <b-form-group label="생성일" label-for="owner-input" v-if="view.id">
          <b-form-input
            id="owner-input"
            v-model="taskData.createdAt"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- 수정일 -->
        <b-form-group label="수정일" label-for="owner-input" v-if="view.id">
          <b-form-input
            id="owner-input"
            v-model="taskData.updatedAt"
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
            v-model="taskData.description"
            :state="taskDataState.descriptionState"
            required
            v-bind:disabled="view.id ? true : false"
            placeholder="할 일에 대한 설명을 입력하세요."
          ></b-form-input>
        </b-form-group>
        <!-- 완료 여부 -->
        <b-form-group
          label="완료 여부"
          label-for="completed-input"
          v-if="view.id"
        >
          <b-form-checkbox
            id="completed-input"
            v-model="taskData.completed"
            required
            switch
            size="lg"
          >
            {{ taskData.completed ? "완료" : "미완료" }}
          </b-form-checkbox>
        </b-form-group>
      </form>
    </template>
    <template #footer>
      <b-button size="sm" variant="success" @click="onSaveClick()">
        {{ view.id ? "수정" : "등록" }}
      </b-button>
      <b-button
        size="sm"
        variant="danger"
        @click="onDeleteClick()"
        v-if="view.id"
      >
        삭제
      </b-button>
      <b-button size="sm" @click="onCancelClick()"> 취소 </b-button>
    </template>
  </b-modal>
</template>

<style scoped></style>
