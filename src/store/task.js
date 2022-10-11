/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
/**
 * @typedef { import("@@/node_modules/vuex/types/index").GetterTree<state, any> } GetterTree
 * @typedef { import("@/model/index").Task } Task
 */
import * as common from "./common";
import taskApi from "@/api/taskApi";

const NAMESPACE = "task";

/**
 * @readonly
 * @enum {string}
 */
const GetterType = Object.freeze({
  TOTAL_COUNT: "TOTAL_COUNT",
  COMPLETED_COUNT: "COMPLETED_COUNT",
  INCOMPLETE_COUNT: "INCOMPLETE_COUNT",
  FILTERED_LIST: "FILTERED_LIST",
});

/**
 * @readonly
 * @enum {string}
 */
const MutationType = Object.freeze({});

const state = getInitialState();

function getInitialState() {
  return {
    view: {
      visible: false,
      id: null,
    },
    /** @type {Task} */
    task: null,
    /** @type {Task[]} */
    list: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
  };
}

const getters = {
  [GetterType.TOTAL_COUNT](state) {
    return state.list.length;
  },
  [GetterType.COMPLETED_COUNT](state) {
    return state.list.filter((item) => item.completed).length;
  },
  [GetterType.INCOMPLETE_COUNT](state) {
    return state.list.filter((item) => !item.completed).length;
  },
  [GetterType.FILTERED_LIST](state) {
    let filteredList = state.list;

    if (state.FILTER === "finished") {
      filteredList = state.list.filter((item) => item.completed);
    } else if (state.FILTER === "unfinished") {
      filteredList = state.list.filter((item) => !item.completed);
    }

    return filteredList;
  },
};

const mutations = {};

const actions = {
  async getAllTask(context, payload) {
    try {
      const result = await taskApi.getAllTask();
      useTaskStore().$patch({
        list: result.data,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTaskById(context, payload) {
    try {
      const result = await taskApi.getTaskById(payload.id);
      useTaskStore().$patch({
        task: result.data,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async addTask(context, payload) {
    try {
      const result = await taskApi.addTask(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTaskById(context, payload) {
    try {
      const result = await taskApi.updateTaskById(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteTaskById(context, payload) {
    try {
      const result = await taskApi.deleteTaskById(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const useTaskStore = common.createUseStore(
  NAMESPACE,
  state,
  getters,
  actions,
  GetterType
);

export default {
  namespaced: true,
  state,
  getters,
  mutations: Object.assign(mutations, common.getMutations(getInitialState)),
  actions: Object.assign(actions, common.getActions()),
};
