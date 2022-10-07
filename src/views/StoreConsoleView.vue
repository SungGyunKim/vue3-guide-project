<template>
  <div class="container-fluid vh-100 pt-2 pb-2">
    <div class="row pb-2 state-io">
      <!-- Payload 영역 -->
      <div class="col">
        <h3>Payload</h3>
        <Vue3JsonEditor
          v-model="payload"
          :expandedOnStart="true"
          class="vue3-json-editor"
          @json-change="onPayloadChange"
        />
      </div>
      <!-- Result 영역 -->
      <div class="col">
        <h3>Result</h3>
        <Vue3JsonEditor
          v-model="result"
          :expandedOnStart="true"
          class="vue3-json-editor"
        />
      </div>
    </div>
    <div class="row console">
      <!-- Modules 영역 -->
      <div class="col-3 h-100">
        <div class="h-100 overflow-auto">
          <table
            class="table table-sm table-striped table-dark table-bordered table-hover"
          >
            <thead>
              <tr>
                <th scope="col" class="align-middle text-center no">No.</th>
                <th scope="col" class="align-middle">Module</th>
                <th scope="col" class="align-middle text-center button">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onModuleSelectedToogleAllClick()"
                  >
                    전체 {{ moduleSelectdAll ? "해제" : "선택" }}
                  </button>
                </th>
                <th scope="col" class="align-middle text-center button">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onModuleStateAllClick()"
                  >
                    전체 상태
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(moduleItem, index) in modules" :key="index">
                <th scope="row" class="align-middle text-center">
                  {{ index + 1 }}
                </th>
                <td class="align-middle">{{ moduleItem.module }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onModuleSelectedToogleClick(moduleItem)"
                  >
                    {{ moduleItem.selected ? "해제" : "선택" }}
                  </button>
                </td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onModuleStateClick(moduleItem)"
                  >
                    상태
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Getters 영역 -->
      <div class="col-3 h-100">
        <div class="h-100 overflow-auto">
          <table
            class="table table-sm table-striped table-dark table-bordered table-hover"
          >
            <thead>
              <tr>
                <th scope="col" class="align-middle text-center no">No.</th>
                <th scope="col" class="align-middle">Getter</th>
                <th scope="col" class="align-middle text-center button">
                  실행
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(getter, index) in getters" :key="index">
                <th scope="row" class="align-middle text-center">
                  {{ index + 1 }}
                </th>
                <td class="align-middle">{{ getter }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onExecuteGetterClick(getter)"
                  >
                    실행
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Mutations 영역 -->
      <div class="col-3 h-100">
        <div class="h-100 overflow-auto">
          <table
            class="table table-sm table-striped table-dark table-bordered table-hover"
          >
            <thead>
              <tr>
                <th scope="col" class="align-middle text-center no">No.</th>
                <th scope="col" class="align-middle">Mutation</th>
                <th scope="col" class="align-middle text-center button">
                  실행
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mutation, index) in mutations" :key="index">
                <th scope="row" class="align-middle text-center">
                  {{ index + 1 }}
                </th>
                <td class="align-middle">{{ mutation }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onExecuteMutationClick(mutation)"
                  >
                    실행
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Actions 영역 -->
      <div class="col-3 h-100">
        <div class="h-100 overflow-auto">
          <table
            class="table table-sm table-striped table-dark table-bordered table-hover"
          >
            <thead>
              <tr>
                <th scope="col" class="align-middle text-center no">No.</th>
                <th scope="col" class="align-middle">Action</th>
                <th scope="col" class="align-middle text-center button">
                  실행
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(action, index) in actions" :key="index">
                <th scope="row" class="align-middle text-center">
                  {{ index + 1 }}
                </th>
                <td class="align-middle">{{ action }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onExecuteActionClick(action)"
                  >
                    실행
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { Vue3JsonEditor } from "vue3-json-editor";

const store = useStore();

// state
const moduleSelectdAll = ref(true);
const modules = ref([]);
const payload = ref({});
const result = ref({});

// derived state
// @ts-ignore
const state = computed(() => store._state.data);
const getters = computed(() =>
  // @ts-ignore
  Object.keys(store._wrappedGetters).filter(selectedModuleFilter)
);
const mutations = computed(() =>
  // @ts-ignore
  Object.keys(store._mutations).filter(selectedModuleFilter)
);
const actions = computed(() =>
  // @ts-ignore
  Object.keys(store._actions).filter(selectedModuleFilter)
);

// component lifecycle hook
onMounted(() => {
  // @ts-ignore
  const modulesArr = Object.keys(store._modulesNamespaceMap).map((module) => ({
    module,
    selected: true,
  }));

  modules.value = modulesArr;
});

// function
function selectedModuleFilter(it) {
  const selectedModuleIndex = modules.value.findIndex(
    (moduleItem) => moduleItem.selected && it.startsWith(moduleItem.module)
  );

  return selectedModuleIndex != -1 ? true : false;
}

function onModuleSelectedToogleAllClick() {
  moduleSelectdAll.value = !moduleSelectdAll.value;

  modules.value.forEach(
    (moduleItem) => (moduleItem.selected = moduleSelectdAll.value)
  );
}

function onModuleSelectedToogleClick(moduleItem) {
  moduleItem.selected = !moduleItem.selected;
}

function onModuleStateAllClick() {
  result.value = state.value;
}

function onModuleStateClick(moduleItem) {
  const module = moduleItem.module.replace("/", "");

  result.value = state.value[module];
}

function onExecuteGetterClick(getter) {
  result.value = store.getters[getter];
}

function onExecuteMutationClick(mutation) {
  result.value = {};

  store.commit(mutation, payload.value);
}

async function onExecuteActionClick(action) {
  const rtn = store.dispatch(action, payload.value);

  if (rtn instanceof Promise) {
    const rtnObj = await rtn;

    if (rtnObj) {
      result.value = rtnObj;
    }
  }
}

function onPayloadChange(value) {
  payload.value = value;
}
</script>

<style scoped>
.state-io {
  height: 550px;
}

.state-io .col .vue3-json-editor {
  height: 500px;
}

.state-io .col .vue3-json-editor::v-deep .jsoneditor-vue {
  height: 100%;
}

.console {
  height: 500px;
}

.console .table thead tr {
  height: 47px;
}

.console .table td.button,
.console .table th.button {
  white-space: nowrap;
  width: 70px;
}

.console .table td.no,
.console .table th.no {
  white-space: nowrap;
  width: 50px;
}
</style>
