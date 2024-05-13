import { RootState } from "../store";

export const selectDailyPointsIncome = (state: RootState): number => state.settings.dailyPointsIncome;