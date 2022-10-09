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
 * @template S, G, A
 * @param {string} NAMESPACE
 * @param {S} StateType
 * @param {G} GetterType
 * @param {A} ActionType
 */
export function createUseStore(NAMESPACE, StateType, GetterType, ActionType) {
  /**
   * @callback arrayCallback
   * @param  {object} element - Value of array element
   * @param  {number} index   - Index of array element
   * @param  {Array}  array   - Array itself
   */

  /**
   * @template S, G, A
   * @typedef {Object} UseStore
   * @property {(stateKeys?: Array<S>) => void} $reset - Store의 State를 초기값 상태로 되돌립니다.
   * @property {(payload: Object) => void} $patch - Store의 State를 변경합니다.
   * @property { function(string, number=): boolean } test -
   * @property {S} StateType
   * @property {G} GetterType
   * @property {A} ActionType
   */
  /**
   * Store의 Module을 Composition API에서 편안하게 사용할 수 있도록 합니다.
   * @returns {UseStore<S, G, A>}
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
      async $reset(payload) {
        await _$reset(payload);
      },
      async $patch(payload) {
        await _$patch(payload);
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
