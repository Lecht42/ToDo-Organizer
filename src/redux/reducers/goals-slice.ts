import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGoal, IGoalList } from "../../utils/interfaces/goals";
import goalsStorage from "../../utils/classes/local-storage/goals-storage";
import moment from "moment";

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
    },
    deleteGoalList: (state, action: PayloadAction<number>) => {
      state.goalLists = state.goalLists.filter((list) => list.id !== action.payload);
    },
    clearGoalList: (state) => {
      state.goalLists = [];
    },
    addGoal: (state, action: PayloadAction<IAddGoalPayload>) => {
      const list = state.goalLists.find((list) => list.id === action.payload.attachedListId);
      if (list) {
        list.items.push({
          id: Date.now(),
          completed: false,
          ...action.payload,
        });
      }
    },
    deleteGoal: (state, action: PayloadAction<IGoalOperationPayload>) => {
      const list = state.goalLists.find((list) => list.id === action.payload.listId);
      if (list && action.payload.id) {
        list.items = list.items.filter((item) => item.id !== action.payload.id);
      }
    },
    toggleGoalCompletion: (state, action: PayloadAction<{ listId: number; id: number }>) => {
      const { listId, id } = action.payload;
      const list = state.goalLists.find((list) => list.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === id);
        if (item) {
          if (!item.completed) {
            item.completed = true;
            console.log(item.completed, item.period);
            if (item.period) {
              const newDeadline = moment(item.deadline)
                .add(item.period.value, item.period.type as moment.unitOfTime.DurationConstructor)
                .toISOString();
              item.deadline = newDeadline;
              item.completed = false;
            }
          } else {
            item.completed = false;
          }
        }
      }
    },
    setGoalsState: (state, action: PayloadAction<GoalsState>) => {
      state.goalLists = action.payload.goalLists;
    },
  },
});

export const {
  addGoalList,
  deleteGoalList,
  clearGoalList,
  deleteGoal,
  addGoal,
  toggleGoalCompletion,
  setGoalsState,
} = goalsSlice.actions;

export default goalsSlice.reducer;
