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
 * @typedef { import("@/model/index").Task } Task
 */
import { createUseStore } from "./common";
import taskApi from "@/api/taskApi";

const NAMESPACE = "task";

const state = {
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

const getters = {
  /**
   * {@link state.list}의 전체 건 수입니다.
   * @param {state} state
   */
  totalCount: (state) => {
    return state.list.length;
  },
  /**
   * {@link state.list}의 item인 {@link Task.completed}가 true인 건 수입니다.
   * @param {state} state
   */
  completedCount: (state) => {
    return state.list.filter((item) => item.completed).length;
  },
  /**
   * {@link state.list}의 item인 {@link Task.completed}가 false인 건 수입니다.
   * @param {state} state
   */
  incompleteCount: (state) => {
    return state.list.filter((item) => !item.completed).length;
  },
  /**
   * {@link state.list}를 {@link state.filter}에 따라 필터된 Array를 반환합니다.
   * @param {state} state
   */
  filteredList: (state) => {
    let filteredList = state.list;

    if (state.filter === "finished") {
      filteredList = state.list.filter((item) => item.completed);
    } else if (state.filter === "unfinished") {
      filteredList = state.list.filter((item) => !item.completed);
    }

    return filteredList;
  },
};

const mutations = {};

const actions = {
  /**
   * Task 데이터 목록을 조회하여 {@link state.list}를 갱신합니다.
   * @see taskApi.getAllTask
   */
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
  /**
   * Task 목록을 {@link state.list}에 갱신합니다.
   * @see taskApi.getAllTask()
   * @see Task
   */
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
  /**
   * Task 데이터를 추가합니다.
   * @see taskApi.addTask()
   * @see Task
   */
  async addTask(context, payload) {
    try {
      const result = await taskApi.addTask(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  /**
   * id에 해당하는 Task 데이터를 갱신합니다.
   * @see taskApi.addTask()
   * @see Task
   */
  async updateTaskById(context, payload) {
    try {
      const result = await taskApi.updateTaskById(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  /**
   * id에 해당하는 Task 데이터를 삭제합니다.
   * @see taskApi.addTask()
   * @see Task
   */
  async deleteTaskById(context, payload) {
    try {
      const result = await taskApi.deleteTaskById(payload);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const useTaskStore = createUseStore(
  NAMESPACE,
  state,
  getters,
  mutations,
  actions
);

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
