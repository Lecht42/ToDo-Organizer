import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PointsState {
  points: number;
  dailyPoints: number;
}

const initialState: PointsState = {
  points: 0,
  dailyPoints: 5,
};

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    clearPoints: (state) => {
      state.points = 0;
    },

    completeDaily: (state) => {
      state.points += state.dailyPoints;
      state.dailyPoints = 0;
    } 
  },
});

export const { clearPoints, addPoints, completeDaily } = pointsSlice.actions;

export default pointsSlice.reducer;
