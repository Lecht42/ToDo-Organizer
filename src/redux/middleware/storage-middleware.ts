import { Middleware, Action } from "redux";
import { Dispatch } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { setGoalsState } from "../reducers/goals-slice";
import { setPointsState } from "../reducers/points-slice";
import { setSettingsState } from "../reducers/settings-slice";
import { setAuthState } from "../reducers/auth-slice";
import authStorage from "../../utils/classes/local-storage/auth-storage";
import goalsStorage from "../../utils/classes/local-storage/goals-storage";
import pointsStorage from "../../utils/classes/local-storage/points-storage";
import settingsStorage from "../../utils/classes/local-storage/settings-storage";

type SetStateActionType =
  | typeof setGoalsState.type
  | typeof setPointsState.type
  | typeof setSettingsState.type
  | typeof setAuthState.type;

interface BaseAction extends Action {
  type: StorageActionType | SetStateActionType;
}

export type StorageActionType = "SAVE_STATE" | "LOAD_STATE";
export type StorageAction = BaseAction;

interface StorageConfig<S, A> {
  storage: {
    saveState: (state: S) => void;
    loadState: () => S | undefined;
  };
  sliceKey: keyof AppState;
  setSliceStateActionType: SetStateActionType;
}

const storageConfigs: StorageConfig<any, any>[] = [
  {
    storage: goalsStorage,
    sliceKey: "goals",
    setSliceStateActionType: setGoalsState.type,
  },
  {
    storage: pointsStorage,
    sliceKey: "points",
    setSliceStateActionType: setPointsState.type,
  },
  {
    storage: settingsStorage,
    sliceKey: "settings",
    setSliceStateActionType: setSettingsState.type,
  },
  {
    storage: authStorage,
    sliceKey: "auth",
    setSliceStateActionType: setAuthState.type,
  },
];

const storageMiddleware: Middleware<{}, AppState, Dispatch<StorageAction>> =
  (store) => (next) => (action) => {
    const result = next(action);

    switch ((action as StorageAction).type) {
      case "SAVE_STATE":
        storageConfigs.forEach(({ storage, sliceKey }) => {
          const stateSlice = store.getState()[sliceKey];
          storage.saveState(stateSlice);
        });
        break;
      case "LOAD_STATE":
        storageConfigs.forEach(({ storage, sliceKey, setSliceStateActionType }) => {
          const loadedState = storage.loadState();
          if (loadedState) {
            store.dispatch({ type: setSliceStateActionType, payload: loadedState });
          }
        });
        break;
      default:
        break;
    }

    return result;
  };

export default storageMiddleware;
