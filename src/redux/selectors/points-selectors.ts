import { RootState } from "../store";

export const getPoints = (state: RootState): number => state.points.points;
export const getDailyPoints = (state: RootState): number => state.points.dailyPoints;