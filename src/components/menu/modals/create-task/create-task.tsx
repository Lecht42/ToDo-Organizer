import React, { useRef, useState, useEffect } from "react";
import {
  IonModal,
  IonList,
  IonItem,
  IonSelect,
  IonLabel,
  IonButton,
  IonDatetimeButton,
  IonInput,
} from "@ionic/react";
import "./create-task.css";
import AwardPickerModal, {
  AWARD_PICKER_MODAL_TRIGGER,
} from "../award-picker/award-picker";
import DatePickerModal from "../date-picker/date-picker";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  IAddGoalPayload,
  addGoal,
} from "../../../../redux/reducers/goals-slice";
import moment, { Moment } from "moment";

interface CreateTaskModalProps {
  listId: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ listId }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useAppDispatch();
  const initState = {
    attachedListId: listId,
    label: "",
    points: 5,
    deadline: moment().toISOString(),
  };
  const [formData, setFormData] = useState<IAddGoalPayload>(initState);

  useEffect(() => {
    if (modal.current && inputRef.current) {
      modal.current.present();
      inputRef.current.setFocus();
    }
  }, [modal]);

  const handleOnConfirm = () => {
    dispatch(addGoal(formData));
    modal.current?.dismiss().then(() => setFormData(initState));
  };

  const handleOnConfirmSubmodal = (
    label?: string,
    points?: number,
    deadline?: string
  ) => {
    console.log(label);
    setFormData((prev) => ({
      ...prev,
      label: label || prev.label,
      points: points || prev.points,
      deadline: deadline || prev.deadline,
    }));
  };

  return (
    <IonModal
      id="create-task-modal"
      className="ion-padding"
      ref={modal}
      trigger={String(listId)}
    >
      <IonList className="ion-padding">
        <IonItem>
          <IonSelect label="Period" placeholder="None"></IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Award</IonLabel>
          <IonButton
            id={AWARD_PICKER_MODAL_TRIGGER}
            fill="clear"
            slot="end"
            expand="block"
          >
            <IonLabel>{formData.points}</IonLabel>
          </IonButton>
          <AwardPickerModal
            value={formData.points}
            onClick={(points: number) =>
              handleOnConfirmSubmodal(undefined, points)
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel>Date</IonLabel>
          <IonDatetimeButton slot="end" datetime="datetime"></IonDatetimeButton>
          <DatePickerModal
            onConfirm={(date: moment.Moment) =>
              handleOnConfirmSubmodal(undefined, undefined, date.toISOString())
            }
            curDate={moment(formData.deadline)}
          />
        </IonItem>
      </IonList>
      <h1 className="ion-padding ion-text-center">
        <IonInput
          placeholder="Type here..."
          value={formData.label}
          maxlength={18}
          onIonInput={(event) =>
            handleOnConfirmSubmodal(event.detail.value as string)
          }
          ref={inputRef}
        ></IonInput>
      </h1>
      <IonButton
        className="ion-margin"
        size="large"
        shape="round"
        onClick={handleOnConfirm}
      >
        Confirm
      </IonButton>
    </IonModal>
  );
};

export default CreateTaskModal;
