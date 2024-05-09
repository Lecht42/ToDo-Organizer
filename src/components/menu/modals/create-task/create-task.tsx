import {
  IonModal,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
} from "@ionic/react";
import "./create-task.css";
import { useRef } from "react";

interface CreateTaskModalProps {
  listId: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ listId }) => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      id="create-task-modal"
      ref={modal}
      trigger={listId}
    >
      <div className="block">Block of Content</div>
    </IonModal>
  );
};

export default CreateTaskModal;
