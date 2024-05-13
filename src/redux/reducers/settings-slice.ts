import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  dailyPointsIncome: number;
  theme: string;
  language: string;
}

const initialState: SettingsState = {
  dailyPointsIncome: 10,
  theme: "",
  language: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDailyPointsIncome: (state, action: PayloadAction<number>) => {
      state.dailyPointsIncome = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setDailyPointsIncome } = settingsSlice.actions;

export default settingsSlice.reducer;
