import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonIcon,
  IonButton,
  IonLabel,
  IonChip,
  IonTitle,
} from "@ionic/react";
import { menu, archive } from "ionicons/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectPoints } from "../../redux/selectors/points-selectors";
import createChipText from "../../utils/functions/create-chip-text";
import { HISTORY_ID } from "../archive/archive";
import { menuController } from "@ionic/core/components";
import { MENU_ID } from "../menu/menu";
import "./header.css";
import { selectPointIconType } from "../../redux/selectors/settings-selectors";

const Header: React.FC = () => {
  const pointSymbol = useAppSelector(selectPointIconType);

  const openMenu = async () => {
    await menuController.open(MENU_ID);
  };

  const openArchiveMenu = async () => {
    await menuController.open(HISTORY_ID);
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButton fill="clear" slot="start" color="dark" onClick={openMenu}>
          <IonIcon icon={menu} />
        </IonButton>
        <IonTitle color="primary" className="ion-text-center">
          <h2>{createChipText(useAppSelector(selectPoints), "", pointSymbol)}</h2>
        </IonTitle>
        <IonButton fill="clear" slot="end" color="dark" onClick={openArchiveMenu}>
          <IonIcon icon={archive} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
