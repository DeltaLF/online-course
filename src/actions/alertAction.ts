import { MESSAGE_ACTIONS_TYPES, Message } from "./types";
import { Action, ActionWithPayload } from "../utils/reducer/reducer.utils";
import { Dispatch, Middleware } from "redux";

export type MessageActions = {
  type: MESSAGE_ACTIONS_TYPES;
  payload: Message;
};

export const messageSuccess = (
  message: Message
): ActionWithPayload<Message> => {
  return {
    type: MESSAGE_ACTIONS_TYPES.SUCCESS,
    payload: message,
  };
};

export const messageError = (message: Message): ActionWithPayload<Message> => {
  return {
    type: MESSAGE_ACTIONS_TYPES.ERROR,
    payload: message,
  };
};

export const messageClear = (): Action => {
  return {
    type: MESSAGE_ACTIONS_TYPES.CLEAR,
  };
};

export const messageClearMiddleware: Middleware =
  (store) => (next: Dispatch) => (action) => {
    if (
      action.type === MESSAGE_ACTIONS_TYPES.SUCCESS ||
      action.types === MESSAGE_ACTIONS_TYPES.ERROR
    ) {
      setTimeout(() => {
        store.dispatch(messageClear());
      }, 3000);
    }
    return next(action);
  };
