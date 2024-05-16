import { SettingsState } from "../reducers/settings-slice";
import { RootState } from "../store";

export const selectDailyPointsIncome = (state: RootState): number => state.settings.dailyPointsIncome;
export const selectDarkMode = (state: RootState): boolean => state.settings.darkMode;
export const selectTextSize = (state: RootState): number => state.settings.textSize;
export const selectFont = (state: RootState): string => state.settings.font;

export const selectSettingsState = (state: RootState) : SettingsState => state.settings;