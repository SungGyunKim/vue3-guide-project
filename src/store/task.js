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
const StateType = Object.freeze({
  VIEW: "VIEW",
  LIST: "LIST",
  FILTER: "FILTER",
  TASK: "TASK",
});

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

/**
 * @readonly
 * @enum {string}
 */
const ActionType = Object.freeze({
  GET_ALL_TASK: "GET_ALL_TASK",
  SET_ALL_TASK: "SET_ALL_TASK",
  GET_TASK_BY_ID: "GET_TASK_BY_ID",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK_BY_ID: "UPDATE_TASK_BY_ID",
  DELETE_TASK_BY_ID: "DELETE_TASK_BY_ID",
});

const state = getInitialState();

function getInitialState() {
  return {
    [StateType.VIEW]: {
      visible: false,
      id: null,
    },
    /** @type {Task} */
    [StateType.TASK]: null,
    /** @type {Task[]} */
    [StateType.LIST]: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    [StateType.FILTER]: "all",
  };
}

/** @type { GetterTree } */
const getters = {
  [GetterType.TOTAL_COUNT](state) {
    return state.LIST.length;
  },
  [GetterType.COMPLETED_COUNT](state) {
    return state.LIST.filter((item) => item.completed).length;
  },
  [GetterType.INCOMPLETE_COUNT](state) {
    return state.LIST.filter((item) => !item.completed).length;
  },
  [GetterType.FILTERED_LIST](state) {
    let filteredList = state.LIST;

    if (state.FILTER === "finished") {
      filteredList = state.LIST.filter((item) => item.completed);
    } else if (state.FILTER === "unfinished") {
      filteredList = state.LIST.filter((item) => !item.completed);
    }

    return filteredList;
  },
};

const mutations = {};

/** @type { Module } */
const actions = {
  async [ActionType.GET_ALL_TASK](context, payload) {
    try {
      const result = await taskApi.getAllTask();
      useTaskStore().$patch({
        [StateType.LIST]: result.data,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.GET_TASK_BY_ID](context, payload) {
    try {
      const result = await taskApi.getTaskById(payload.id);
      useTaskStore().$patch({
        [StateType.TASK]: result.data,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.ADD_TASK](context, payload) {
    try {
      const result = await taskApi.addTask(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.UPDATE_TASK_BY_ID](context, payload) {
    try {
      const result = await taskApi.updateTaskById(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.DELETE_TASK_BY_ID](context, payload) {
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
  StateType,
  GetterType,
  ActionType
);

export default {
  namespaced: true,
  state,
  getters,
  mutations: Object.assign(mutations, common.getMutations(getInitialState)),
  actions: Object.assign(actions, common.getActions()),
};
