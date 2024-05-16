import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoal, IArchiveGoal, IGoalList } from "../../utils/interfaces/goals";
import moment from "moment";
import _ from "lodash";
import pointsStorage from "../../utils/classes/local-storage/points-storage";

export interface PointsState {
  points: number;
  dailyPoints: number;
  archive: IArchiveGoal[];
}

const storageState: PointsState = pointsStorage.loadState() as PointsState;

export const pointsInitState =  {
  points: 0,
  dailyPoints: 0,
  archive: [],
}

const initialState: PointsState = storageState || pointsInitState;

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    completeGoal: (state, action: PayloadAction<IGoal>) => {
      const points = action.payload.completed ? -action.payload.points : action.payload.points;
      state.points += points
      state.archive.push(
        _.omit(
          {
            ...action.payload,
            deadline: moment().toISOString(),
            points
          },
          ["attachedListId", "period"]
        )
      );
    },
    completeDaily: (state) => {
      state.points += state.dailyPoints;
      state.archive.push({
        id: Date.now(),
        label: "Daily",
        points: state.dailyPoints,
        deadline: moment().toISOString(),
      });
      state.dailyPoints = 0;
    },
    completeList: (state, action: PayloadAction<IGoalList>) => {
      state.points += state.points;
      state.archive.push({
        id: action.payload.id || Date.now(),
        label: action.payload.label,
        points: action.payload.points || 0,
        deadline: moment().toISOString(),
      });
    },
    setPointsState: (state, action: PayloadAction<PointsState>) => {
      state = action.payload;
    },
  },
});

export const { completeGoal, completeDaily, completeList, setPointsState } = pointsSlice.actions;

export default pointsSlice.reducer;
