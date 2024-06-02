import {
  useIonActionSheet,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonIcon,
  IonModal,
  IonItemOption,
  IonItemOptions,
  IonItem,
  IonItemSliding,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import _ from "lodash";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteGoalList } from "../../../redux/reducers/goals-slice";
import { GoalListProps } from "../../goal-list/goal-list";
import CreateTaskModal from "../modals/create-task/create-task";
import MenuGoal from "./menu-goal/menu-goal";
import { useTranslation } from "react-i18next";

const MenuGoalList: React.FC<GoalListProps> = ({ id, label, items }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [present] = useIonActionSheet();

  const handleCreateTask = () => {
    setIsCreatingTask(true);
  };

  const handleDeleteTaskList = () => {
    present({
      header: `${t("are_you_sure_delete")} ${label}?`,
      buttons: [
        {
          text: t("yes"),
          role: "confirm",
          handler: () => {
            setIsDeleting(true);
            setTimeout(() => {
              dispatch(deleteGoalList(id));
            }, 700);
          },
        },
        {
          text: t("no"),
          role: "cancel",
        },
      ],
    });
  };

  return (
    <>
      <IonList className={isDeleting ? "element-out" : ""}>
        <IonListHeader>
          <IonItemSliding>
            <IonItem lines="none">
              <IonLabel>
                <h1>{label}</h1>
              </IonLabel>
              <IonButton slot="end" onClick={handleCreateTask} expand="block" size="large">
                <IonIcon size="large" icon={add} />
              </IonButton>
            </IonItem>
            <IonItemOptions side="start">
              <IonItemOption color="primary" onClick={handleDeleteTaskList}>
                <IonIcon size="large" icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonListHeader>
        {_.map(
          _.filter(items, (e) => e.id !== undefined),
          (e, i) => (
            <MenuGoal {...e} listId={id} key={i} />
          )
        )}
      </IonList>
      <IonModal isOpen={isCreatingTask} onDidDismiss={() => setIsCreatingTask(false)}>
        <CreateTaskModal listId={id} onClose={() => setIsCreatingTask(false)} />
      </IonModal>
    </>
  );
};

export default MenuGoalList;
