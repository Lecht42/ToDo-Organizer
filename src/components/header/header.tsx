import { IonHeader, IonToolbar, IonIcon, IonButton, IonTitle } from "@ionic/react";
import { menu, archive } from "ionicons/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectPoints } from "../../redux/selectors/points-selectors";
import ArchiveModal from "../menu/modals/archive/archive";
import { menuController } from "@ionic/core/components";
import { MENU_ID } from "../menu/menu";
import "./header.css";
import { selectPointIconType } from "../../redux/selectors/settings-selectors";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const Header: React.FC = () => {
  const points = useAppSelector(selectPoints);
  const pointSymbol = useAppSelector(selectPointIconType);
  const [prevPoints, setPrevPoints] = useState(points);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const countUpElement = document.querySelector(".countup-container");
    if (countUpElement) {
      countUpElement.setAttribute("data-pointsymbol", pointSymbol);
    }
  }, [pointSymbol]);

  useEffect(() => {
    setTimeout(() => setPrevPoints(points), 1000);
  }, [points]);

  const openMenu = async () => {
    await menuController.open(MENU_ID);
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButton fill="clear" slot="start" color="dark" onClick={openMenu}>
          <IonIcon icon={menu} />
        </IonButton>
        <IonTitle color="primary" className="ion-text-center">
          <div className="countup-container">
            <CountUp start={prevPoints} end={points} duration={1} />
          </div>
        </IonTitle>
        <IonButton onClick={() => setIsArchiveOpen(true)} fill="clear" slot="end" color="dark">
          <IonIcon icon={archive} />
        </IonButton>
        <ArchiveModal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
