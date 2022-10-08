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

export const _MutationType = Object.freeze({
  RESET_STATE: "RESET_STATE",
  PATCH_STATE: "PATCH_STATE",
});

export const _ActionType = Object.freeze({
  RESET_STATE: "RESET_STATE",
  PATCH_STATE: "PATCH_STATE",
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

export function createUseStore(NAMESPACE, StateType, GetterType, ActionType) {
  return () => {
    const { useState, useGetters, useActions } =
      createNamespacedHelpers(NAMESPACE);
    const { RESET_STATE, PATCH_STATE } = useActions([
      _ActionType.RESET_STATE,
      _ActionType.PATCH_STATE,
    ]);

    return {
      StateType,
      GetterType,
      ActionType,
      ...useState(Object.keys(StateType)),
      ...useGetters(Object.keys(GetterType)),
      ...useActions(Object.keys(ActionType)),
      async $reset(payload) {
        await RESET_STATE(payload);
      },
      async $patch(payload) {
        await PATCH_STATE(payload);
      },
    };
  };
}

function isObject(value) {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}
function isEmpty(value) {
  return Object.keys(value).length === 0;
}
