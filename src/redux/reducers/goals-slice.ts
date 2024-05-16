import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGoal, IGoalList } from "../../utils/interfaces/goals";
import goalsStorage from "../../utils/classes/local-storage/goals-storage";

export interface IAddGoalPayload extends Omit<IGoal, "deadline"> {
  attachedListId: number;
  deadline: string;
}

export interface IGoalOperationPayload {
  listId: number;
  id?: number;
}

export interface GoalsState {
  goalLists: IGoalList[];
}

const storageState: GoalsState = goalsStorage.loadState() as GoalsState;

export const goalsInitState = {
  goalLists: [],
};

const initialState: GoalsState = storageState || goalsInitState;

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoalList: (state, action: PayloadAction<IGoalList>) => {
      state.goalLists.push({
        ...action.payload,
        id: Date.now(),
      });
      console.log(state);
    },
    deleteGoalList: (state, action: PayloadAction<number>) => {
      state.goalLists = state.goalLists.filter((list) => list.id !== action.payload);
      console.log(state);
    },
    clearGoalList: (state) => {
      state.goalLists = [];
      console.log(state);
    },
    addGoal: (state, action: PayloadAction<IAddGoalPayload>) => {
      const list = state.goalLists.find((list) => list.id === action.payload.attachedListId);
      if (list) {
        list.items.push({
          id: Date.now(),
          label: action.payload.label,
          completed: false,
          points: action.payload.points,
          deadline: action.payload.deadline,
        });
      }
      console.log(state);
    },
    removeGoal: (state, action: PayloadAction<IGoalOperationPayload>) => {
      const list = state.goalLists.find((list) => list.id === action.payload.listId);
      if (list && action.payload.id) {
        list.items = list.items.filter((item) => item.id !== action.payload.id);
      }
      console.log(state);
    },
    toggleGoalCompletion: (state, action: PayloadAction<IGoalOperationPayload>) => {
      const list = state.goalLists.find((list) => list.id === action.payload.listId);
      if (list) {
        const item = list.items.find((item) => item.id === action.payload.id);
        if (item) {
          item.completed = !item.completed;
        }
      }
      console.log(state);
    },
    setGoalsState: (state, action: PayloadAction<IGoalList[]>) => {
      state.goalLists = action.payload;
      console.log(action.payload);
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
  setGoalsState,
} = goalsSlice.actions;

export default goalsSlice.reducer;
