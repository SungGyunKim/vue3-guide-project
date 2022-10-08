/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
import * as common from "./common";
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
  ...common.MutationType,
});

const ActionType = Object.freeze({
  ...common.ActionType,
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
    /** @type {{ completed :boolean, _id: string, description: string, owner: string, createdAt: string, updatedAt: string, __v: number }[]} */
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
  ...common.getMutations(getInitialState),
};

const actions = {
  ...common.getActions(),
  async [ActionType.GET_ALL_TASK](context, payload) {
    try {
      const result = await taskApi.getAllTask();
      context.commit(MutationType.SET_STATE, {
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
      context.commit(MutationType.SET_STATE, {
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
  StateType,
  GetterType,
  ActionType
);
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
