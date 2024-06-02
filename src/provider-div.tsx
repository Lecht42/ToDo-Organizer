import React, { useEffect } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Home from "./pages/home/home";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectGoalsState } from "./redux/selectors/goals-selectors";
import { selectDailyPointsIncome, selectSettingsState } from "./redux/selectors/settings-selectors";
import { selectAuthState } from "./redux/selectors/auth-selectors";
import { tryFetchUserState, tryPutUserState } from "./redux/sagas/user/user-actions";
import { selectDailyPoints, selectLastGetPoints, selectPointsState } from "./redux/selectors/points-selectors";
import _ from "lodash";
import isSameDay from "./utils/functions/is-same-day";
import { setDailyPoints } from "./redux/reducers/points-slice";

const ProviderDiv: React.FC = () => {
  const dispatch = useAppDispatch();

  const goals = useAppSelector(selectGoalsState);
  const settings = useAppSelector(selectSettingsState);
  const points = useAppSelector(selectPointsState);
  const auth = useAppSelector(selectAuthState);
  const dailyPointIncome = useAppSelector(selectDailyPointsIncome);
  const dailyPointsGettingDate = useAppSelector(selectLastGetPoints);


  useEffect(() => {
    if (!isSameDay(dailyPointsGettingDate))
      dispatch(setDailyPoints(dailyPointIncome))
  }, []);

  useEffect(() => {
    dispatch(tryFetchUserState(auth.googleAuth?.clientId));
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
    </>
  );
};

export default ProviderDiv;
