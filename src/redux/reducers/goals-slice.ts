import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGoal, IGoalList } from "../../utils/interfaces/goals";

export interface IAddGoalPayload extends IGoal {
  listId: number;
}

export interface IGoalOperationPayload {
  listId: number;
  id?: number;
}

const initialState: { goalLists: IGoalList[] } = {
  goalLists: [
    {
      id: 2412,
      points: 100,
      items: [
        {
          id: 73220,
          label: "Complete the project",
          completed: false,
          points: 100,
          deadline: new Date().toISOString(),
        },
        {
          id: 37929,
          label: "Complete the project",
          completed: true,
          points: 20,
          deadline: new Date().toISOString(),
        },
        {
          id: 76626,
          label: "Practice piano",
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
        },
      ],
      label: "test1 fadfs",
    },
    {
      id: 5274,
      points: 100,
      items: [
        {
          id: 36974,
          label: "Clean the house",
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 56547,
          label: "Finish the homework",
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 89493,
          label: "Cook a new dish",
          completed: true,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 99429,
          label: "Complete the project",
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
        },
      ],
      label: "test2",
    },
    {
      id: 6043,
      points: 100,
      items: [
        {
          id: 57849,
          label: "Read a book",
          completed: true,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 99892,
          label: "Cook a new dish",
          completed: true,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 69827,
          label: "Read a book",
          completed: true,
          points: 0,
          deadline: new Date().toISOString(),
        },
        {
          id: 68633,
          label: "Plan the holiday",
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
        },
      ],
      label: "test3",
    },
  ],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoalList: (state, action: PayloadAction<IGoalList>) => {
      state.goalLists.push(action.payload);
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
        (list) => list.id === action.payload.listId
      );
      if (list) {
        list.items.push({
          id: Date.now(), 
          label: action.payload.label,
          completed: false,
          points: 0,
          deadline: new Date().toISOString(),
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
