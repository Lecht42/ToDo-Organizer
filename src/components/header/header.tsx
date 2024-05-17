import { IonHeader, IonToolbar, IonMenuButton, IonIcon, IonButton, IonLabel, IonChip } from "@ionic/react";
import { menu, archive } from "ionicons/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectPoints } from "../../redux/selectors/points-selectors";
import createChipText from "../../utils/functions/create-chip-text";
import { HISTORY_ID } from "../archive/archive";
import { menuController } from '@ionic/core/components';
import { MENU_ID } from "../menu/menu";

const Header: React.FC = () => {
  const openMenu = async ()=> {
    await menuController.open(MENU_ID);
  }

  const openArchiveMenu = async ()=> {
    await menuController.open(HISTORY_ID);
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButton fill="clear" slot="start" color="dark" onClick={openMenu}>
          <IonIcon icon={menu} />
        </IonButton>
        <IonChip slot="" color="success">
          <IonLabel>{createChipText(useAppSelector(selectPoints), "")}</IonLabel>
        </IonChip>
         <IonButton fill="clear" slot="end" color="dark" onClick={openArchiveMenu}>   
          <IonIcon icon={archive} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
