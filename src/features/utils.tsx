import {AnyAction} from "@reduxjs/toolkit"
import includes from "lodash/includes";

type ValidAction = "pending" | "fulfilled" | "rejected";

export const getMatcher = (actions: string[], actionType: ValidAction[]) => {
    const isValidAction = (type: string) => {
      const lastIndex = type.lastIndexOf("/");
      const action = type.slice(0, lastIndex);
      return includes(actions, action);
    };
  
    return (action: AnyAction) => {
      const type = action.type;
      const isValidType = actionType.some((t) => type.endsWith(`/${t}`));
      return isValidAction(type) && isValidType;
    };
  };