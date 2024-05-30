import React, { useRef, useState, useEffect, useCallback } from "react";
import { IonModal, IonItem, IonLabel, IonButton, IonInput } from "@ionic/react";
import { useAppDispatch } from "../../../../redux/hooks";
import { addGoalList } from "../../../../redux/reducers/goals-slice";
import { GoalListType } from "../../../../utils/interfaces/goals";
import PointsPickerModal, { AWARD_PICKER_MODAL_TRIGGER } from "../points-picker/points-picker";
import { useTranslation } from "react-i18next";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";

export const MAX_LABEL_LENGTH = 18;

const initialGoalListState: GoalListType = {
  label: "",
  points: 10,
  items: [],
};

interface CreateTaskListModalProps {
  trigger: string;
}

const CreateTaskListModal: React.FC<CreateTaskListModalProps> = ({ trigger }) => {
  const { t } = useTranslation();
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<GoalListType>(initialGoalListState);

  const handleOnConfirm = useCallback(() => {
    dispatch(addGoalList(formData));
    modal.current?.dismiss().then(() => setFormData(initialGoalListState));
  }, [dispatch, formData]);

  const handleOnConfirmSubmodal = useCallback((label?: string, points?: number) => {
    setFormData((prev) => ({
      ...prev,
      label: label ?? prev.label,
      points: points ?? prev.points,
    }));
  }, []);

  return (
    <IonModal id="create-task-modal" className="ion-padding" ref={modal} trigger={trigger}>
      <IonItem lines="full" className="ion-padding">
        <IonLabel>{t("award")}</IonLabel>
        <IonButton id={AWARD_PICKER_MODAL_TRIGGER} fill="clear" slot="end" expand="block">
          <IonLabel><h2>{formData.points}</h2></IonLabel>
        </IonButton>
        <PointsPickerModal
          value={formData.points as number}
          step={5}
          max={50}
          onConfirm={(points: number) => handleOnConfirmSubmodal(undefined, points)}
          trigger={AWARD_PICKER_MODAL_TRIGGER}
        />
      </IonItem>
      <h1 className="ion-padding ion-text-center">
        <IonInput
          placeholder="Type here..."
          value={formData.label}
          maxlength={MAX_LABEL_LENGTH}
          onIonInput={(event) => handleOnConfirmSubmodal(event.detail.value as string)}
          ref={inputRef}
        />
      </h1>
      <ConfirmButton onClick={handleOnConfirm} disabled={formData.label.length === 0} />
    </IonModal>
  );
};

export default CreateTaskListModal;
