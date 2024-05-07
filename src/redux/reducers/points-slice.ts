import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PointsState {
  points: number;
  lastChange: Date;
}

const initialState: PointsState = {
  points: 0,
  lastChange: new Date(),
};

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
      state.lastChange = new Date();
    },
    clearPoints: (state) => {
      state.points = 0;
      state.lastChange = new Date();
    },
  },
});

export const { clearPoints, addPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
