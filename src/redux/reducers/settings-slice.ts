import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import settingsStorage from "../../utils/classes/local-storage/settings-storage";
import { DEFAULT_POINTS_SYMBOL, PointSymbol } from "../../utils/functions/create-chip-text";

export interface SettingsState {
  dailyPointsIncome: number;
  textSize: number;
  fontFamily: string;
  darkMode: boolean;
  language: string;
  pointIconType: PointSymbol;
  notifications: boolean;
  notificationTime: string;
}

const storageState: SettingsState = settingsStorage.loadState() as SettingsState;

export const settingsInitState = {
  dailyPointsIncome: 10,
  textSize: 20,
  fontFamily: "Arial",
  darkMode: false,
  language: "en",
  pointIconType: DEFAULT_POINTS_SYMBOL,
  notifications: false,
  notificationTime: "00:00",
};

const initialState: SettingsState = storageState || settingsInitState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDailyPointsIncome: (state, action: PayloadAction<number>) => {
      state.dailyPointsIncome = action.payload;
    },
    setGlobalTextSize: (state, action: PayloadAction<number>) => {
      state.textSize = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setPointIconType: (state, action: PayloadAction<PointSymbol>) => {
      state.pointIconType = action.payload;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    setNotificationTime: (state, action: PayloadAction<string>) => {
      state.notificationTime = action.payload;
    },
    setSettingsState: (state, action: PayloadAction<SettingsState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setDailyPointsIncome,
  setGlobalTextSize,
  setFontFamily,
  toggleDarkMode,
  setLanguage,
  setPointIconType,
  setNotifications,
  setNotificationTime,
  setSettingsState,
} = settingsSlice.actions;

export default settingsSlice.reducer;
