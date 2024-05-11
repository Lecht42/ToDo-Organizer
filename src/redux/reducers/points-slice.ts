import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PointsState {
  points: number;
}

const initialState: PointsState = {
  points: 0,
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
  },
});

export const { clearPoints, addPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
