import React, { useEffect } from "react";
import Archive from "./components/archive/archive";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Home from "./pages/home/home";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectGoalsState } from "./redux/selectors/goals-selectors";
import { selectSettingsState } from "./redux/selectors/settings-selectors";
import { selectAuthState } from "./redux/selectors/auth-selectors";
import { tryFetchUserState, tryPutUserState } from "./redux/sagas/user/user-actions";
import { selectPointsState } from "./redux/selectors/points-selectors";
import _ from "lodash";
import { goalsInitState } from "./redux/reducers/goals-slice";
import { pointsInitState } from "./redux/reducers/points-slice";
import { settingsInitState } from "./redux/reducers/settings-slice";

const ProviderDiv: React.FC = () => {
  const dispatch = useAppDispatch();

  const goals = useAppSelector(selectGoalsState);
  const settings = useAppSelector(selectSettingsState);
  const points = useAppSelector(selectPointsState);
  const auth = useAppSelector(selectAuthState);

  useEffect(() => {
    if (auth.googleAuth?.clientId) {
      dispatch(tryFetchUserState(auth.googleAuth.clientId));
    }
  }, [dispatch, auth.googleAuth?.clientId]);

  useEffect(() => {
    dispatch({
      type: tryPutUserState.type,
      payload: {
        id: auth.googleAuth?.clientId,
        goals,
        points,
        settings,
      },
    });
  }, [goals, settings]);

  return (
    <>
      <Header />
      <Home />
      <Menu />
      <Archive />
    </>
  );
};

export default ProviderDiv;
