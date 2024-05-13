import { useEffect, useRef, useState } from "react";
import { IonContent, IonItem, IonList, IonListHeader, IonModal, IonToggle } from "@ionic/react";
import type { ToggleCustomEvent } from "@ionic/react";
import Header from "../../../header/header";

export const SETTINGS_MODAL_TRIGGER = "open-settings-modal";

const SettingsModal = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [paletteToggle, setPaletteToggle] = useState(false);

  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkPalette(ev.detail.checked);
  };

  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  const initializeDarkPalette = (isDark: boolean) => {
    setPaletteToggle(isDark);
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    initializeDarkPalette(prefersDark.matches);
    const handler = (mediaQuery: { matches: boolean }) => initializeDarkPalette(mediaQuery.matches);
    prefersDark.addEventListener("change", handler);
    return () => prefersDark.removeEventListener("change", handler);
  }, []);

  return (
    <IonModal
      id="settings-modal"
      className="ion-padding"
      trigger={SETTINGS_MODAL_TRIGGER}
      ref={modal}
      keepContentsMounted
    >
        <IonListHeader>Appearance</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle checked={paletteToggle} onIonChange={toggleChange}>
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>
    </IonModal>
  );
};

export default SettingsModal;
