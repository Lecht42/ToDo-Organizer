import { RootState } from "../store";

export const selectPoints = (state: RootState): number => state.points.points;
export const selectDailyPoints = (state: RootState): number => state.points.dailyPoints;