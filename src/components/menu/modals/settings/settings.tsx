import { useEffect, useRef, useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton
} from "@ionic/react";
import type { ToggleCustomEvent } from "@ionic/react";
import { useDispatch } from "react-redux";
import { setDailyPointsIncome, setGlobalTextSize, toggleDarkMode } from "../../../../redux/reducers/settings-slice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../redux/hooks";
import { selectDailyPointsIncome, selectDarkMode, selectTextSize } from "../../../../redux/selectors/settings-selectors";
import { preloadLanguages } from "../../../../i18next";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";

export const SETTINGS_MODAL_TRIGGER = "open-settings-modal";

const SettingsModal = () => {
  const { t, i18n } = useTranslation();
  const darkMode = useAppSelector(selectDarkMode);
  const textSize = useAppSelector(selectTextSize);
  const dailyIncome = useAppSelector(selectDailyPointsIncome);
  const dispatch = useDispatch();
  const modal = useRef<HTMLIonModalElement>(null);

  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [localTextSize, setLocalTextSize] = useState(textSize);
  const [localDailyIncome, setLocalDailyIncome] = useState(dailyIncome);
  
  useEffect(() => {
    document.documentElement.style.setProperty("font-size", `${localTextSize}px`);
  }, [textSize, localTextSize]);

  useEffect(() => {
    setLocalDarkMode(darkMode);
    setLocalTextSize(textSize);
    setLocalDailyIncome(dailyIncome);
  }, [darkMode, textSize, dailyIncome]);

  const handleOnConfirm = () => {
    dispatch(toggleDarkMode(localDarkMode));
    dispatch(setGlobalTextSize(localTextSize));
    dispatch(setDailyPointsIncome(localDailyIncome));
    modal.current?.dismiss();
  };

  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  const handleChangeDarkMode = (event: ToggleCustomEvent) => {
    setLocalDarkMode(event.detail.checked);
    toggleDarkPalette(event.detail.checked);
  };

  return (
    <IonModal
      id="settings-modal"
      className="ion-padding"
      trigger={SETTINGS_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
    >
      <IonListHeader>
        <IonLabel>{t("settings")}</IonLabel>
      </IonListHeader>
      <IonList inset={true}>
        <IonItem>
          <IonSelect
            label={t("language")}
            value={i18n.language}
            onIonChange={(event) => i18n.changeLanguage(event.detail.value)}
          >
            {preloadLanguages.map((e, i) => (
              <IonSelectOption value={e} key={i}>
                {t(e)}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            label={t("daily_points_income")}
            type="number"
            max={100}
            min={0}
            value={localDailyIncome}
            className="ion-text-right"
            onIonChange={(event) => setLocalDailyIncome(Number(event.detail.value))}
          />
        </IonItem>
        <IonItem>
          <IonToggle checked={localDarkMode} onIonChange={handleChangeDarkMode}>
            {t("dark_mode")}
          </IonToggle>
        </IonItem>
        <IonItem>
          <IonRange
            pin
            ticks
            snaps
            min={14}
            max={28}
            step={1}
            value={localTextSize}
            onIonChange={(e) => setLocalTextSize(e.detail.value as number)}
          >
            <IonLabel slot="start">14px</IonLabel>
            <IonLabel slot="end">28px</IonLabel>
          </IonRange>
        </IonItem>
        <ConfirmButton onClick={handleOnConfirm} />
      </IonList>
    </IonModal>
  );
};

export default SettingsModal;
