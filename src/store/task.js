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
  RESET_STATE: "RESET_STATE",
  SET_STATE: "SET_STATE",
  MERGE_STATE: "MERGE_STATE",
  SET_VIEW: "SET_VIEW",
  SET_ALL_TASK: "SET_ALL_TASK",
  SET_TASK: "SET_TASK",
});

const ActionType = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_STATE: "SET_STATE",
  MERGE_STATE: "MERGE_STATE",
  SET_VIEW: "SET_VIEW",
  GET_ALL_TASK: "GET_ALL_TASK",
  SET_ALL_TASK: "SET_ALL_TASK",
  GET_TASK_BY_ID: "GET_TASK_BY_ID",
  ADD_TASK: "ADD_TASK",
});

const state = getInitialState();

function getInitialState() {
  return {
    [StateType.VIEW]: {
      visible: false,
      id: null,
    },
    [StateType.TASK]: {},
    /** @type {{ completed :boolean, _id: string, description: string, owner: string, createdAt: string, updatedAt: string, __v: number }[]} */
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
  // 모든 Store 기능
  [MutationType.RESET_STATE](state, payload) {
    const initialState = getInitialState();
    let resetTargetKeys = [];

    if (Array.isArray(payload)) {
      // 존재하는 State만 초기화 대상으로 지정한다
      resetTargetKeys = Object.keys(initialState).filter((x) =>
        payload.includes(x)
      );
    } else {
      resetTargetKeys = Object.keys(initialState);
    }

    resetTargetKeys.forEach((resetTargetKey) => {
      state[resetTargetKey] = initialState[resetTargetKey];
    });
  },
  [MutationType.SET_STATE](state, payload) {
    const setTargetKeys = Object.keys(payload);

    setTargetKeys.forEach((setTargetKey) => {
      state[setTargetKey] = payload[setTargetKey];
    });
  },
  [MutationType.MERGE_STATE](state, payload) {
    // TODO
  },
  // 해당 Store 기능
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
  // 모든 Store 기능
  async [ActionType.RESET_STATE](context, payload) {
    context.commit(MutationType.RESET_STATE, payload);
    return;
  },
  async [ActionType.SET_STATE](context, payload) {
    context.commit(MutationType.SET_STATE, payload);
    return;
  },
  async [ActionType.MERGE_STATE](context, payload) {
    context.commit(MutationType.MERGE_STATE, payload);
    return;
  },
  // 해당 Store 기능
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
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.GET_TASK_BY_ID](context, payload) {
    try {
      const result = await taskApi.getTaskById(payload.id);
      context.commit(MutationType.SET_TASK, result.data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.ADD_TASK](context, payload) {
    try {
      const result = await taskApi.addTask(payload);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
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
