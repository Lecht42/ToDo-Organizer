import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MainTab.css';

const MainTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const goalLists = useAppSelector((state) => state.goalLists);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
          
      </IonContent>
    </IonPage>
  );
};

export default MainTab;
function useAppDispatch() {
  throw new Error('Function not implemented.');
}

function useAppSelector(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}

