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
 * @readonly
 * @enum {string}
 */
const _MutationType = Object.freeze({
  RESET_STATE: "_RESET_STATE",
  PATCH_STATE: "_PATCH_STATE",
});

/**
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
 * @template S - State의 제네릭
 * @template ST - StateType의 제네릭
 * @template GT - GetterType의 제네릭
 * @template AT - ActionType의 제네릭
 * @param {string} NAMESPACE - Store의 네임스페이스
 * @param {S} state - Store의 State
 * @param {ST} StateType - Store의 State 유형
 * @param {GT} GetterType - Store의 Getter 유형
 * @param {AT} ActionType - Store의 Action 유형
 */
export function createUseStore(
  NAMESPACE,
  state,
  StateType,
  GetterType,
  ActionType
) {
  /**
   * @template T, ST, GT, AT
   * @typedef {Object} UseStore
   * @property {T} state
   * @property {ST} StateType - Store의 State 유형
   * @property {GT} GetterType - Store의 Getter 유형
   * @property {AT} ActionType - Store의 Action 유형
   * @property {(state: T) => void} $patch - Store의 State를 변경합니다.
   * @property {(stateKeys?: Array<ST>) => void} $reset - Store의 State를 전체 혹은 일부를 초기값 상태로 되돌립니다.
   */
  /**
   * Store의 Module을 Composition API에서 편안하게 사용할 수 있도록 합니다.
   * @return {UseStore<S, ST, GT, AT>} Store의 Module을 다루는 객체
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

    return {
      StateType,
      GetterType,
      ActionType,
      ...useState(Object.keys(StateType)),
      ...useGetters(Object.keys(GetterType)),
      ...useActions(Object.keys(ActionType)),
      async $patch(state) {
        await _$patch(state);
      },
      async $reset(stateKeys) {
        await _$reset(stateKeys);
      },
    };
  }

  return _createUseStore;
}

function isObject(value) {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}
function isEmpty(value) {
  return Object.keys(value).length === 0;
}
