import { RootState } from "../store";

export const getPoints = (state: RootState): number => state.points.points;
