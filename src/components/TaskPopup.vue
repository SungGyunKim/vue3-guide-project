<script setup>
import { reactive } from "vue";
import { useTaskStore } from "@/store/task";

/**
 * 컴포넌트 준비 작업
 */
const props = defineProps({
  visible: Boolean,
  taskId: String,
});
const emits = defineEmits([]);
defineExpose({});

// state
const taskData = reactive({
  name: "",
  nameState: null,
});
</script>

<template>
  <b-modal v-model="visible" size="lg" scrollable centered>
    <template #title> Task 등록/수정 팝업 </template>

    <template #default="">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="taskData.nameState"
        >
          <b-form-input
            id="name-input"
            v-model="taskData.name"
            :state="taskData.nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </template>
  </b-modal>
</template>

<style scoped></style>
