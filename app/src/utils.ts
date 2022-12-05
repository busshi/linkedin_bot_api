import { actions } from "./constants";

export const formatActionMessage = (action: string) => {
  return action.startsWith("- ")
    ? action.substring(2)
    : action.startsWith("-")
    ? action.substring(1)
    : action;
};

export const checkAction = (action: string) => {
  if (actions.hasOwnProperty(action)) {
    console.log(JSON.parse(JSON.stringify(actions))[action]);
    return JSON.parse(JSON.stringify(actions))[action];
  }
  return undefined;
};

export const wait = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000));
