import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonIcon,
  IonButton,
  IonLabel,
  IonContent,
} from "@ionic/react";
import { menu } from "ionicons/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectPoints } from "../../redux/selectors/points-selectors";
import createChipText from "../../utils/functions/create-chip-text";

const Header: React.FC = () => {
  const points = useAppSelector(selectPoints);
  
  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" color="dark">
            <IonIcon icon={menu} />
          </IonMenuButton>
          <IonButton slot="end" color="dark">
            <IonLabel>{createChipText(points, "")}</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonLabel>Test</IonLabel>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Header;