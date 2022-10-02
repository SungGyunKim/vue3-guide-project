/*!
 * /store/index.js
 *
 * @brief
 * 분류에 맞게 흩어진 Store Module들을 하나로 합쳐서 Store 인스턴스를 생성 및 내보내기 하는 곳입니다.
 * 새로운 Store Module이 생기면 아래 Store Module 목록에 추가합니다.
 *
 * @author       Kim Sung Gyun, <egoksg@osstem.com>
 * @version      1.0
 * @modification
 *
 * @copyRight COPYRIGHT © OSSTEM IMPLANT CO., LTD. ALL RIGHTS RESERVED.
 */
import { createStore, createLogger } from "vuex";
import task from "./task";

const debug = process.env.NODE_ENV !== "production";
const store = createStore({
  modules: {
    task,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
