import { configureStore, combineReducers } from "@reduxjs/toolkit";
import goalsReducer, { GoalsState } from "./reducers/goals-slice";
import pointsReducer, { PointsState } from "./reducers/points-slice";
import settingsReducer, { SettingsState } from "./reducers/settings-slice";
import authReducer, { AuthState } from "./reducers/auth-slice";
import storageMiddleware from "./middleware/storage-middleware";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root-saga";

export interface AppState {
  goals: GoalsState;
  points: PointsState;
  settings: SettingsState;
  auth: AuthState;
}

const rootReducer = combineReducers({
  goals: goalsReducer,
  points: pointsReducer,
  settings: settingsReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware, sagaMiddleware), 
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
