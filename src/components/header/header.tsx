import { IonHeader, IonToolbar, IonMenuButton, IonIcon, IonButton, IonLabel } from "@ionic/react";
import { arrowBack, menu } from "ionicons/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectPoints } from "../../redux/selectors/points-selectors";
import createChipText from "../../utils/functions/create-chip-text";
import HomeTab, { HOME_HREF } from "../../pages/home/home";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonMenuButton autoHide={false} slot="start" color="dark">
          <IonIcon icon={menu} />
        </IonMenuButton>
        <IonButton slot="end" color="dark">
          <IonLabel>{createChipText(useAppSelector(selectPoints), "")}</IonLabel>
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
