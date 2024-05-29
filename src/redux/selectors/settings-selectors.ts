import { RootState } from "../store";
import { SettingsState } from "../reducers/settings-slice";

export const selectDailyPointsIncome = (state: RootState): number => state.settings.dailyPointsIncome;
export const selectDarkMode = (state: RootState): boolean => state.settings.darkMode;
export const selectTextSize = (state: RootState): number => state.settings.textSize;
export const selectFontFamily = (state: RootState): string => state.settings.fontFamily;
export const selectPointIconType = (state: RootState): string => state.settings.pointIconType;
export const selectNotifications = (state: RootState): boolean => state.settings.notifications;
export const selectNotificationTime = (state: RootState): string => state.settings.notificationTime;
export const selectArchiveSettings = (state: RootState) => {
  return {
    archiveOnlyIncome: state.settings.archiveOnlyIncome,
    archiveWithoutRepeats: state.settings.archiveWithoutRepeats,
  };
};

export const selectSettingsState = (state: RootState): SettingsState => state.settings;
