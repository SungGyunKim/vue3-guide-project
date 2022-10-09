<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useTaskStore } from "@/store/task";

// vuex 방법 - State, Getters
const store = useStore();
const list = computed(() => store.state.task.LIST);
const competedCount = computed(() => store.getters["task/COMPLETED_COUNT"]);

// vuex 방법 - Actions
const setAllTask = (payload) =>
  store.dispatch("task/_PATCH_STATE", { LIST: payload });

// ##################################################################################
const taskStore = useTaskStore();

console.log(taskStore);

// vuex-composition-helpers 방법 - State
const { LIST: list2 } = taskStore;

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

  /** @deprecated common.js의 $patch로 대체합니다. */
  console.warn("common.js의 $patch를 참고하세요.");
  taskStore["PATCH_STATE"]({
    [taskStore.StateType.LIST]: data,
  });
}

function onClickMethod3() {
  const data = [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
    { id: 4, completed: true },
  ];

  taskStore.$patch({
    LIST: data,
  });
}
</script>

<template>
  <main>
    <section>
      <h1>vuex basic 방법</h1>
      <div>
        <ul>
          <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div>{{ competedCount }}</div>
      <button @click="onClickMethod1">set task list</button>
    </section>
    <section>
      <h1>vuex-composition-helpers 방법</h1>
      <div>
        <ul>
          <li v-for="item in list2" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div>{{ taskStore[taskStore.GetterType.COMPLETED_COUNT] }}</div>
      <button @click="onClickMethod2">set task list</button>
    </section>
    <section>
      <h1>common</h1>
      <div>
        <ul>
          <li v-for="item in list2" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div>{{ taskStore[taskStore.GetterType.COMPLETED_COUNT] }}</div>
      <button @click="onClickMethod3">set task list</button>
    </section>
  </main>
</template>

<style scoped></style>
