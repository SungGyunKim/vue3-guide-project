/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
import { computed } from "vue";
import { useStore } from "vuex";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import taskApi from "@/api/taskApi";

const NAMESPACE = "task";

const StateType = Object.freeze({
  VIEW: "VIEW",
  LIST: "LIST",
  FILTER: "FILTER",
  TASK: "TASK",
});

const GetterType = Object.freeze({
  COMPLETED_COUNT: "COMPLETED_COUNT",
  INCOMPLETE_COUNT: "INCOMPLETE_COUNT",
});

const MutationType = Object.freeze({
  RESET: "RESET",
  SET_VIEW: "SET_VIEW",
  SET_ALL_TASK: "SET_ALL_TASK",
  SET_TASK: "SET_TASK",
});

const ActionType = Object.freeze({
  RESET: "RESET",
  SET_VIEW: "SET_VIEW",
  GET_ALL_TASK: "GET_ALL_TASK",
  SET_ALL_TASK: "SET_ALL_TASK",
  GET_TASK_BY_ID: "GET_TASK_BY_ID",
});

const state = getInitialState();

function getInitialState() {
  return {
    [StateType.VIEW]: {
      visible: false,
      id: null,
    },
    /** @type {{ completed :boolean, _id: string, description: string, owner: string, createdAt: string, updatedAt: string, __v: number }} */
    [StateType.TASK]: null,
    [StateType.LIST]: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    [StateType.FILTER]: "all",
  };
}

const getters = {
  [GetterType.COMPLETED_COUNT](state) {
    return state[StateType.LIST].filter((item) => item.completed).length;
  },
  [GetterType.INCOMPLETE_COUNT](state) {
    return state[StateType.LIST].filter((item) => !item.completed).length;
  },
};

const mutations = {
  [MutationType.RESET](state, payload) {
    const newState = getInitialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  [MutationType.SET_VIEW](state, payload) {
    Object.keys(payload).forEach((key) => {
      state[StateType.VIEW][key] = payload[key];
    });
  },
  [MutationType.SET_ALL_TASK](state, payload) {
    state[StateType.LIST] = payload;
  },
  [MutationType.SET_TASK](state, payload) {
    state[StateType.TASK] = payload;
  },
};

const actions = {
  async [ActionType.RESET](context, payload) {
    context.commit(MutationType.RESET, payload);
  },
  async [ActionType.SET_VIEW](context, payload) {
    context.commit(MutationType.SET_VIEW, payload);
  },
  async [ActionType.SET_ALL_TASK](context, payload) {
    context.commit(MutationType.SET_ALL_TASK, payload);
    return Promise.resolve();
  },
  async [ActionType.GET_ALL_TASK](context, payload) {
    try {
      const result = await taskApi.getAllTask();
      context.commit(MutationType.SET_ALL_TASK, result.data);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  async [ActionType.GET_TASK_BY_ID](context, payload) {
    try {
      const result = await taskApi.getTaskById(payload.id);
      context.commit(MutationType.SET_TASK, result.data);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

const useTaskStore = () => {
  const { useState, useGetters, useActions } =
    createNamespacedHelpers(NAMESPACE);

  return {
    StateType,
    GetterType,
    ActionType,
    ...useState(Object.keys(StateType)),
    ...useGetters(Object.keys(GetterType)),
    ...useActions(Object.keys(ActionType)),
  };
};

export { useTaskStore };
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
