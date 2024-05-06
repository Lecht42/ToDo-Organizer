import { createSlice } from "@reduxjs/toolkit";
import { IGoalList } from "../../interfaces";

const usersSlice = createSlice({
  name: "goals",
  initialState: {
    goalLists: [
      {
        id: 2412,
        items: [
          { id: 73220, label: "Complete the project", completed: false },
          { id: 37929, label: "Complete the project", completed: true },
          { id: 76626, label: "Practice piano", completed: false },
        ],
        label: "test1 fadfs"
      },
      {
        id: 5274,
        items: [
          { id: 36974, label: "Clean the house", completed: false },
          { id: 56547, label: "Finish the homework", completed: false },
          { id: 89493, label: "Cook a new dish", completed: true },
          { id: 99429, label: "Complete the project", completed: false },
        ],
        label: "test2",
      },
      {
        id: 6043,
        items: [
          { id: 57849, label: "Read a book", completed: true },
          { id: 99892, label: "Cook a new dish", completed: true },
          { id: 69827, label: "Read a book", completed: true },
          { id: 68633, label: "Plan the holiday", completed: false },
        ],
        label: "test3",
      },
    ] as IGoalList[],
  },
  reducers: {
    addGoalList: (state, action) => {
      state.goalLists.push(action.payload);
    },
    deleteGoalList: (state, action) => {
      state.goalLists = state.goalLists.filter(
        (list) => list.id !== action.payload.listId
      );
    },
    clearGoalList: (state) => {
      state.goalLists = [];
    },

    addGoal: (state, action) => {
      const list = state.goalLists.find(
        (e) => e.id === action.payload.listId
      );
      if (list) {
        list.items.push({
          id: Date.now(),
          label: action.payload.label,
          completed: false,
        });
      }
    },
    removeGoal: (state, action) => {
      const list = state.goalLists.find(
        (e) => e.id === action.payload.listId
      );
      if (list) {
         list.items = list.items.filter((e) => action.payload.id !== e.id);
      }
    },
    flickGoal: (state, action) => {
      console.log(action.payload.listId)
      const list = state.goalLists.find(
        (e) => e.id === action.payload.listId
      );
      if (list) {
        const item = list.items.find((e) => action.payload.id === e.id);
        item!.completed = !item?.completed;
      }
    }
  },
});

export const {addGoalList, deleteGoalList, clearGoalList, removeGoal, addGoal, flickGoal} = usersSlice.actions;

export default usersSlice.reducer;
