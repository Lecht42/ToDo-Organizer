import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import settingsStorage from "../../utils/classes/local-storage/settings-storage";

export interface SettingsState {
  dailyPointsIncome: number;
  textSize: number;
  darkMode: boolean;
  language: string;
  font: string;
}
const storageState: SettingsState = settingsStorage.loadState() as SettingsState;

export const settingsInitState = {
  dailyPointsIncome: 10,
  textSize: 20,
  darkMode: false,
  language: "en",
  font: "",
}

const initialState: SettingsState = storageState || settingsInitState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDailyPointsIncome: (state, action: PayloadAction<number>) => {
      state.dailyPointsIncome = action.payload;
    },
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setGlobalTextSize: (state, action: PayloadAction<number>) => {
      state.textSize = action.payload;
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setSettingsState: (state, action: PayloadAction<SettingsState>) => {
      state = action.payload;
    },
  },
});

export const { setDailyPointsIncome, toggleDarkMode, setGlobalTextSize, setFont, setSettingsState } = settingsSlice.actions;

export default settingsSlice.reducer;
