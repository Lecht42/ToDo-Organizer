import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  dailyPointsIncome: number;
  textSize: number;
  darkMode: boolean;
  language: string;
  font: string;
}

const initialState: SettingsState = {
  dailyPointsIncome: 10,
  textSize: 20,
  darkMode: false,
  language: "en",
  font: ""
};

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
  },
});

export const { setDailyPointsIncome, toggleDarkMode,  setGlobalTextSize, setFont } = settingsSlice.actions;

export default settingsSlice.reducer;
