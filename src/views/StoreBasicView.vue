<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useTaskStore } from "@/store/task";

// vuex 방법
// vuex 방법 - State, Getters
const store = useStore();
const list = computed(() => store.state.task.LIST);
const competedCount = computed(() => store.getters["task/COMPLETED_COUNT"]);

// vuex 방법 - Actions
const setAllTask = (payload) => store.dispatch("task/SET_ALL_TASK", payload);

console.log(list);

// ##################################################################################
const taskStore = useTaskStore();

// vuex-composition-helpers 방법
// vuex-composition-helpers 방법 - State, Getters
const { LIST: list } = taskStore.useState([taskStore.StateType.LIST]);
const { COMPLETED_COUNT : completedCount } = taskStore.useGetters([taskStore.GetterType.COMPLETED_COUNT])

// vuex-composition-helpers 방법 - Actions
const taskActions = {
  ...taskStore.useActions([taskStore.ActionType.SET_ALL_TASK]),
};

console.log(taskState[taskStore.StateType.LIST]);

// ##################################################################################

function onClickMethod1() {
  const data = [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
    { id: 4, completed: true },
    { id: 5, completed: true },
    { id: 6, completed: false },
  ];

  setAllTask(data);
}

function onClickMethod2() {
  const data = [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
  ];

  taskActions[taskStore.ActionType.SET_ALL_TASK](data);
}
</script>

<template>
  <main>
    <h1>vuex 방법</h1>
    <div>
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div>{{ competedCount }}</div>
    <button @click="onClickMethod1">SET_ALL_TASK</button>
    <h1>vuex-composition-helpers 방법</h1>
    <div>
      <ul>
        <li v-for="item in list" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
    <div>{{ completedCount }}</div>
    <button @click="onClickMethod2">SET_ALL_TASK</button>
  </main>
</template>

<style scoped></style>
