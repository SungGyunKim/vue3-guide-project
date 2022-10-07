/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
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
  TOTAL_COUNT: "TOTAL_COUNT",
  COMPLETED_COUNT: "COMPLETED_COUNT",
  INCOMPLETE_COUNT: "INCOMPLETE_COUNT",
  FILTERED_LIST: "FILTERED_LIST",
});

const MutationType = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_STATE: "SET_STATE",
  SET_VIEW: "SET_VIEW",
  SET_ALL_TASK: "SET_ALL_TASK",
  SET_TASK: "SET_TASK",
});

const ActionType = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_STATE: "SET_STATE",
  SET_VIEW: "SET_VIEW",
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
    /** @type {{ completed :boolean, _id: string, description: string, owner: string, createdAt: string, updatedAt: string, __v: number }} */
    [StateType.TASK]: null,
    [StateType.LIST]: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    [StateType.FILTER]: "all",
  };
}

const getters = {
  [GetterType.TOTAL_COUNT](state) {
    return state[StateType.LIST].length;
  },
  [GetterType.COMPLETED_COUNT](state) {
    return state[StateType.LIST].filter((item) => item.completed).length;
  },
  [GetterType.INCOMPLETE_COUNT](state) {
    return state[StateType.LIST].filter((item) => !item.completed).length;
  },
  [GetterType.FILTERED_LIST](state) {
    let fileterdList = state[StateType.LIST];

    if (state[StateType.FILTER] === "finished") {
      fileterdList = state[StateType.LIST].filter((item) => item.completed);
    } else if (state[StateType.FILTER] === "unfinished") {
      fileterdList = state[StateType.LIST].filter((item) => !item.completed);
    }

    return fileterdList;
  },
};

const mutations = {
  // 모든 Store 기능
  [MutationType.RESET_STATE](state, payload) {
    const initialState = getInitialState();
    const initialStateKeys = Object.keys(initialState);
    let resetTargetKeys = Array.isArray(payload)
      ? payload.filter((x) => initialStateKeys.includes(x))
      : initialStateKeys;

    resetTargetKeys.forEach((resetTargetKey) => {
      state[resetTargetKey] = initialState[resetTargetKey];
    });
  },
  [MutationType.SET_STATE](state, payload) {
    function isObject(value) {
      return (
        typeof value === "object" && !Array.isArray(value) && value !== null
      );
    }
    function isEmpty(value) {
      return Object.keys(value).length === 0;
    }

    const setTargetKeys = Object.keys(payload);

    setTargetKeys.forEach((setTargetKey) => {
      if (isObject(payload[setTargetKey]) && !isEmpty(payload[setTargetKey])) {
        Object.assign(state[setTargetKey], payload[setTargetKey]);
      } else {
        state[setTargetKey] = payload[setTargetKey];
      }
    });
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
    return Promise.resolve();
  },
  async [ActionType.SET_STATE](context, payload) {
    context.commit(MutationType.SET_STATE, payload);
    return Promise.resolve();
  },
  // 해당 Store 기능
  async [ActionType.SET_VIEW](context, payload) {
    context.commit(MutationType.SET_VIEW, payload);
    return Promise.resolve();
  },
  async [ActionType.SET_ALL_TASK](context, payload) {
    context.commit(MutationType.SET_ALL_TASK, payload);
    return Promise.resolve();
  },
  async [ActionType.GET_ALL_TASK](context, payload) {
    try {
      const result = await taskApi.getAllTask();
      context.commit(MutationType.SET_ALL_TASK, result.data);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async [ActionType.GET_TASK_BY_ID](context, payload) {
    try {
      const result = await taskApi.getTaskById(payload.id);
      context.commit(MutationType.SET_TASK, result.data);
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
