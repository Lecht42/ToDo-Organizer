import { AuthState } from "../../../redux/reducers/auth-slice";
import { GoalsState } from "../../../redux/reducers/goals-slice";
import { PointsState } from "../../../redux/reducers/points-slice";
import { SettingsState } from "../../../redux/reducers/settings-slice";
import _ from "lodash";

type State = SettingsState | GoalsState | PointsState | AuthState;

class StorageFacade {
  private state?: State;

  protected slotName!: string;

  constructor(slotName: string) {
    this.slotName = slotName;
  }

  saveState(state: State) {
    try {
      if (_.isEqual(this.state, state)) throw new Error(`${this.slotName}: State similar to previous`);

      localStorage.setItem(this.slotName, JSON.stringify(state));
      this.state = state;
    } catch (e: unknown) {
      console.warn((e as Error).message);
    }
  }

  loadState() {
    try {
      const state = localStorage.getItem(this.slotName);

      if (state === null) throw new Error(`${this.slotName}: No value`);

      this.state = JSON.parse(state);

      return this.state;
    } catch (e: unknown) {
      console.warn((e as Error).message);
    }
  }

  getState(): State | undefined {
    return this.state;
  }
}

export default StorageFacade;
