import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import settingsStorage from "../../utils/classes/local-storage/settings-storage";
import { SettingsState } from "../../utils/interfaces/states";

const storageState: SettingsState = settingsStorage.loadState() as SettingsState;

export const settingsInitState = {
  dailyPointsIncome: 10,
  textSize: 20,
  darkMode: false,
  language: "en",
};

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
    setSettingsState: (state, action: PayloadAction<SettingsState>) => {
      state.dailyPointsIncome = action.payload.dailyPointsIncome;
      state.textSize = action.payload.textSize;
      state.language = action.payload.language;
      state.darkMode = action.payload.darkMode;
    },
  },
});

export const { setDailyPointsIncome, toggleDarkMode, setGlobalTextSize, setSettingsState } =
  settingsSlice.actions;

export default settingsSlice.reducer;
