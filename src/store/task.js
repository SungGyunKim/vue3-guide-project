/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
import taskApi from "@/api/taskApi";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const NAMESPACE = "task";

const StateType = Object.freeze({
  LIST: "LIST",
  FILTER: "FILTER",
});

const GetterType = Object.freeze({
  COMPLETED_COUNT: "COMPLETED_COUNT",
  INCOMPLETE_COUNT: "INCOMPLETE_COUNT",
});

const MutationType = Object.freeze({
  RESET: "RESET",
  SET_ALL_TASK: "SET_ALL_TASK",
});

const ActionType = Object.freeze({
  RESET: "RESET",
  GET_ALL_TASK: "GET_ALL_TASK",
  SET_ALL_TASK: "SET_ALL_TASK",
});

const initialState = () => ({
  /** @type {{ completed :boolean, _id: string, description: string, owner: string, createdAt: string, updatedAt: string, __v: number }[]} */
  [StateType.LIST]: [],
  /** @type {'all' | 'finished' | 'unfinished'} */
  [StateType.FILTER]: "all",
});

const state = initialState();

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
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  [MutationType.SET_ALL_TASK](state, payload) {
    state[StateType.LIST] = payload;
  },
};

const actions = {
  async [ActionType.RESET](context, payload) {
    context.commit("RESET", payload);
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
};

const useTaskStore = () => {
  const { useState, useGetters, useActions } =
    createNamespacedHelpers(NAMESPACE);

  return {
    StateType,
    GetterType,
    ActionType,
    useState,
    useGetters,
    useActions,
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
