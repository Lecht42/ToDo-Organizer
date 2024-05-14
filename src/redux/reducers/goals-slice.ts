import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGoal, IGoalList } from "../../utils/interfaces/goals";
import moment from "moment";

export interface IAddGoalPayload extends Omit<IGoal, "deadline"> {
  attachedListId: number;
  deadline: string;
}

export interface IGoalOperationPayload {
  listId: number;
  id?: number;
}

 const initialState: { goalLists: IGoalList[] } = {
  goalLists: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoalList: (state, action: PayloadAction<IGoalList>) => {
      state.goalLists.push({
        ...action.payload,
        id: Date.now(),
      });
    },
    deleteGoalList: (state, action: PayloadAction<number>) => {
      state.goalLists = state.goalLists.filter(
        (list) => list.id !== action.payload
      );
    },
    clearGoalList: (state) => {
      state.goalLists = [];
    },

    addGoal: (state, action: PayloadAction<IAddGoalPayload>) => {
      const list = state.goalLists.find(
        (list) => list.id === action.payload.attachedListId
      );
      if (list) {
        list.items.push({
          id: Date.now(),
          label: action.payload.label,
          completed: false,
          points: action.payload.points,
          deadline: action.payload.deadline,
        });
      }
    },
    removeGoal: (state, action: PayloadAction<IGoalOperationPayload>) => {
      const list = state.goalLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list && action.payload.id) {
        list.items = list.items.filter((item) => item.id !== action.payload.id);
      }
    },
    toggleGoalCompletion: (
      state,
      action: PayloadAction<IGoalOperationPayload>
    ) => {
      const list = state.goalLists.find(
        (list) => list.id === action.payload.listId
      );
      if (list) {
        const item = list.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.completed = !item.completed;
        }
      }
    },
  },
});

export const {
  addGoalList,
  deleteGoalList,
  clearGoalList,
  removeGoal,
  addGoal,
  toggleGoalCompletion,
} = goalsSlice.actions;

export default goalsSlice.reducer;
