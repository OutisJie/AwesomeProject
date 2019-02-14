import { createAction, handleActions } from "redux-actions";
import { createAjaxAction } from "../utils/index";

const camelToBlank = name => name.replace(/([A-Z])/g, " $1").toLowerCase();

export const createReducerAction = (state, action, operation) => {
  const { res } = action.payload;
  if (hasResponseError(res)) {
    res.msg && message.error(res.msg, 8);
    return { ...state, loading: false, submitting: false };
  }
  return operation();
};

const createReducerHelper = ({ typeList, actionList, defaultState }) => {
  const defaultAction = {
    request: (state, action) => ({ ...state, loading: true, submitting: true }),
    receive: (state, action) =>
      createReducerAction(state, action, () => {
        const { res } = action.payload;
        console.log("-------");
        return { ...res, loading: false, submitting: false };
      }),
    update: (state, action) => ({ ...state, ...action.payload }),
    reset: (state, action) => defaultState
  };

  const actionObj = {};
  typeList.forEach(ele => {
    Object.keys(ele).forEach(key => {
      actionObj[ele[key]] = actionList[ele[key]] || defaultAction[key];
    });
  });
  return handleActions(actionObj, defaultState);
};

export const createReducer = ({
  defaultState,
  name,
  actions = {},
  isLocal
}) => {
  const nameList = Array.isArray(name) ? name : [name];

  const typeList = nameList.map(name =>
    isLocal
      ? {
        update: `update ${camelToBlank(name)}`,
        reset: `reset ${camelToBlank(name)}`
      }
      : {
        request: `request ${camelToBlank(name)}`,
        receive: `recieve ${camelToBlank(name)}`
      }
  );

  const actionList = {};
  Object.keys(actions).forEach(key => {
    actionList[camelToBlank(key)] = actions[key];
  });

  return createReducerHelper({ typeList, actionList, defaultState });
};

// 返回一个action
export const createFetchAction = ({ name, api }) =>
  createAjaxAction(
    api,
    createAction(`request ${camelToBlank(name)}`),
    createAction(`recieve ${camelToBlank(name)}`)
  );
