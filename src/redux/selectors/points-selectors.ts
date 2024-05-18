import { PointsDeltaEntry } from "../../utils/interfaces/goals";
import { PointsState } from "../reducers/points-slice";
import { RootState } from "../store";

export const selectPoints = (state: RootState): number => state.points.points;
export const selectDailyPoints = (state: RootState): number => state.points.dailyPoints;
export const selectPointsArchive = (state: RootState): PointsDeltaEntry[] => state.points.log;

export const selectPointsState = (state: RootState): PointsState => state.points;
