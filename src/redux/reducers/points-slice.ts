import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoalType, PointsDeltaEntry, GoalListType } from "../../utils/interfaces/goals";
import moment from "moment";
import _ from "lodash";
import pointsStorage from "../../utils/classes/local-storage/points-storage";

export interface PointsState {
  points: number;
  dailyPoints: number;
  lastGetDailyPointsDate: string;
  log: PointsDeltaEntry[];
}

const storageState: PointsState = pointsStorage.loadState() as PointsState;
const pointsInitState: PointsState = {
  points: 0,
  dailyPoints: 10,
  lastGetDailyPointsDate: "2000-10-31T01:30:00.000-05:00",
  log: [],
};

const initialState: PointsState = storageState || pointsInitState;

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    setDailyPoints: (state, action: PayloadAction<number>) => {
      state.dailyPoints = action.payload;
    },
    completeGoal: (state, action: PayloadAction<GoalType>) => {
      const points = action.payload.completed ? -action.payload.points : action.payload.points;
      state.points += points;
      const entry: PointsDeltaEntry = {
        id: Date.now(),
        label: action.payload.label,
        points,
        deadline: moment().toISOString(),
      };
      state.log.push(entry);
    },
    completeDaily: (state) => {
      state.points += state.dailyPoints;
      const entry: PointsDeltaEntry = {
        id: Date.now(),
        label: "Daily Points",
        points: state.dailyPoints,
        deadline: moment().toISOString(),
      };
      state.log.push(entry);
      state.dailyPoints = 0;
      state.lastGetDailyPointsDate = moment().toISOString();
    },
    completeList: (state, action: PayloadAction<GoalListType>) => {
      const points = action.payload.points || 0;
      state.points += points;
      const entry: PointsDeltaEntry = {
        id: action.payload.id || Date.now(),
        label: action.payload.label,
        points,
        deadline: moment().toISOString(),
      };
      state.log.push(entry);
    },
    setPointsState: (state, action: PayloadAction<PointsState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDailyPoints, completeGoal, completeDaily, completeList, setPointsState } = pointsSlice.actions;

export default pointsSlice.reducer;
