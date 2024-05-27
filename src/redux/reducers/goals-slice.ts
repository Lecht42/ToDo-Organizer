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
        list.items.push({ id: Date.now(), completed: false, ...action.payload });
      }
    },
    updateGoal: (state, action: PayloadAction<GoalType>) => {
      const list = _.find(state.goalLists, { id: action.payload.attachedListId });
      if (list) {
        let goal = list.items[list.items.findIndex((e) => e.id === action.payload.id)];
        goal = action.payload;
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
          item.completed = !item.completed;
          if (item.completed && item.period) {
            const newDeadline = moment(item.deadline)
              .add(item.period.value, item.period.type as moment.unitOfTime.DurationConstructor)
              .toISOString();
            const repeatedListName = `${list.label} ${t("repeat")}`;
            const repeatList = _.find(state.goalLists, { label: repeatedListName });

            const newGoal = { ...item, id: Date.now(), deadline: newDeadline, completed: false };

            if (!repeatList) {
              state.goalLists.push({ id: Date.now(), label: repeatedListName, items: [newGoal] });
            } else {
              repeatList.items.push(newGoal);
            }

            _.remove(list.items, { id });
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
  updateGoal,
  toggleGoalCompletion,
  setGoalsState,
} = goalsSlice.actions;

export default goalsSlice.reducer;
