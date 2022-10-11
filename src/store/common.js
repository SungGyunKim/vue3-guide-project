/*!
 * @brief
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
import store from "@/store";
import { createNamespacedHelpers } from "vuex-composition-helpers";

/**
 * @private
 * @readonly
 * @enum {string}
 */
const _MutationType = Object.freeze({
  RESET_STATE: "_RESET_STATE",
  PATCH_STATE: "_PATCH_STATE",
});

/**
 * @private
 * @readonly
 * @enum {string}
 */
const _ActionType = Object.freeze({
  RESET_STATE: "_RESET_STATE",
  PATCH_STATE: "_PATCH_STATE",
});

export function getMutations(getInitialState) {
  return {
    [_MutationType.RESET_STATE](state, payload) {
      const initialState = getInitialState();
      const initialStateKeys = Object.keys(initialState);
      let resetTargetKeys = Array.isArray(payload)
        ? payload.filter((x) => initialStateKeys.includes(x))
        : initialStateKeys;

      resetTargetKeys.forEach((resetTargetKey) => {
        state[resetTargetKey] = initialState[resetTargetKey];
      });
    },
    [_MutationType.PATCH_STATE](state, payload) {
      const stateKeys = Object.keys(payload);

      stateKeys.forEach((stateKey) => {
        const sourceTarget = payload[stateKey];
        if (
          isObject(sourceTarget) &&
          !isEmpty(sourceTarget) &&
          isObject(state[stateKey]) &&
          !isEmpty(state[stateKey])
        ) {
          Object.keys(sourceTarget).forEach((key) => {
            state[stateKey][key] = sourceTarget[key];
          });
        } else {
          state[stateKey] = sourceTarget;
        }
      });
    },
  };
}

export function getActions() {
  return {
    async [_ActionType.RESET_STATE](context, payload) {
      context.commit(_MutationType.RESET_STATE, payload);
      return Promise.resolve();
    },
    async [_ActionType.PATCH_STATE](context, payload) {
      context.commit(_MutationType.PATCH_STATE, payload);
      return Promise.resolve();
    },
  };
}

/**
 * @template S - state의 제네릭
 * @template G - getters의 제네릭
 * @template A - actions의 제네릭
 * @template ST - StateType의 제네릭
 * @template GT - GetterType의 제네릭
 * @param {string} NAMESPACE - Store의 네임스페이스
 * @param {S} state - Store의 state
 * @param {G} getters - Store의 getters
 * @param {A} actions - Store의 actions
 * @param {ST} StateType - Store의 State 유형
 * @param {GT} GetterType - Store의 Getter 유형
 */
export function createUseStore(
  NAMESPACE,
  state,
  getters,
  actions,
  StateType,
  GetterType
) {
  /**
   * @template S, G, A, ST, GT
   * @typedef {import("@@/node_modules/vuex-composition-helpers/dist/types/util").ComputedRefTypes<S> } ComputedRefStates
   * @typedef {import("@@/node_modules/vuex-composition-helpers/dist/types/util").ExtractGetterTypes<GT> } ComputedRefGetters
   * @typedef {import("@@/node_modules/vuex-composition-helpers/dist/types/util").ExtractTypes<A, (payload: any) => Promise<any>> } ExtractTypesActions
   * @typedef {Object} UseStore
   * //@property {ST} StateType - Store의 State 유형
   * //@property {GT} GetterType - Store의 Getter 유형
   * @property {(state: S) => void} $patch - Store의 State를 변경합니다.
   * @property {(stateKeys?: Array<ST>) => void} $reset - Store의 State를 전체 혹은 일부를 초기값 상태로 되돌립니다.
   */
  /**
   * Store의 Module을 Composition API에서 편안하게 사용할 수 있도록 합니다.
   */
  function _createUseStore() {
    const { useState, useGetters, useActions } = createNamespacedHelpers(
      store,
      NAMESPACE
    );
    const {
      [_ActionType.RESET_STATE]: _$reset,
      [_ActionType.PATCH_STATE]: _$patch,
    } = useActions([_ActionType.RESET_STATE, _ActionType.PATCH_STATE]);
    /** @type {UseStore<S, G, A, ST, GT> & ComputedRefStates<S, G, A, ST, GT> & ComputedRefGetters<S, G, A, ST, GT> & ExtractTypesActions<S, G, A, ST, GT> } */
    let useStoreInstance = {
      StateType,
      GetterType,
      ...useState(Object.keys(StateType)),
      ...useGetters(Object.keys(GetterType)),
      ...useActions(Object.keys(actions)),
      async $patch(state) {
        await _$patch(state);
      },
      async $reset(stateKeys) {
        await _$reset(stateKeys);
      },
    };

    return useStoreInstance;
  }

  return _createUseStore;
}

function isObject(value) {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}
function isEmpty(value) {
  return Object.keys(value).length === 0;
}
