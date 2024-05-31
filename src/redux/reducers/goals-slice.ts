import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoalType, GoalListType } from "../../utils/interfaces/goals";
import goalsStorage from "../../utils/classes/local-storage/goals-storage";
import moment from "moment";
import { t } from "i18next";
import _ from "lodash";

export interface IAddGoalPayload extends Omit<GoalType, "deadline"> {
  attachedListId: number;
  deadline: string;
}

export interface IGoalOperationPayload {
  listId: number;
  id?: number;
}

export interface GoalsState {
  goalLists: GoalListType[];
}

const storageState: GoalsState = goalsStorage.loadState() as GoalsState;
const initialState: GoalsState = storageState || { goalLists: [] };

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoalList: (state, action: PayloadAction<GoalListType>) => {
      state.goalLists.push({ ...action.payload, id: Date.now() });
    },
    deleteGoalList: (state, action: PayloadAction<number>) => {
      _.remove(state.goalLists, { id: action.payload });
    },
    clearGoalList: (state) => {
      state.goalLists = [];
    },
    addGoal: (state, action: PayloadAction<IAddGoalPayload>) => {
      const list = _.find(state.goalLists, { id: action.payload.attachedListId });
      if (list) {
        list.items.push({ ...action.payload, id: Date.now(), completed: false });
      }
    },
    updateGoal: (state, action: PayloadAction<GoalType>) => {
      const list = _.find(state.goalLists, { id: action.payload.attachedListId });
      if (list) {
        const goalIndex = list.items.findIndex((e) => e.id === action.payload.id);
        if (goalIndex !== -1) {
          list.items[goalIndex] = action.payload;
        }
      }
    },
    deleteGoal: (state, action: PayloadAction<IGoalOperationPayload>) => {
      const list = _.find(state.goalLists, { id: action.payload.listId });
      if (list && action.payload.id) {
        _.remove(list.items, { id: action.payload.id });
      }
    },
    toggleGoalCompletion: (state, action: PayloadAction<{ listId: number; id: number }>) => {
      const { listId, id } = action.payload;
      const list = _.find(state.goalLists, { id: listId });
    
      if (list) {
        const item = _.find(list.items, { id });
    
        if (item) {
          if (item.period) {
            const newDeadline = moment(item.deadline).add(item.period.value, item.period.type);
            item.deadline = newDeadline.toISOString();
          }
    
          item.completed = !item.completed;
        }
      }
    },
    disableCompletion: (state, action: PayloadAction<{ listId: number; id: number }>) => {
      const { listId, id } = action.payload;
      const list = _.find(state.goalLists, { id: listId });
    
      if (list) {
        const item = _.find(list.items, { id });
    
        if (item) {
          item.completed = false;
        }
      }
    },
    reorderGoals: (state, action: PayloadAction<{ listId: number; reorderedItems: GoalType[] }>) => {
      const list = _.find(state.goalLists, { id: action.payload.listId });
      if (list) {
        list.items = action.payload.reorderedItems;
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
  updateGoal,
  toggleGoalCompletion,
  setGoalsState,
  reorderGoals,
  disableCompletion
} = goalsSlice.actions;

export default goalsSlice.reducer;
