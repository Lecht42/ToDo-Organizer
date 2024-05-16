import React, { useRef, useState, useEffect, useCallback } from "react";
import { IonModal, IonList, IonItem, IonLabel, IonButton, IonInput, IonDatetimeButton } from "@ionic/react";
import moment from "moment";

import AwardPickerModal, { AWARD_PICKER_MODAL_TRIGGER } from "../award-picker/award-picker";
import DatePickerModal from "../date-picker/date-picker";
import PeriodPickerModal, { PERIOD_PICKER_MODAL_TRIGGER } from "../period-picker/period-picker";
import { useAppDispatch } from "../../../../redux/hooks";
import { IAddGoalPayload, addGoal } from "../../../../redux/reducers/goals-slice";
import IPeriod from "../../../../utils/interfaces/period";
import { useTranslation } from "react-i18next";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import getMaxDate from "../../../../utils/functions/get-max-date";

interface CreateTaskModalProps {
  listId: number;
}

const initialFormData = (listId: number) => ({
  attachedListId: listId,
  label: "",
  points: 5,
  deadline: moment().toISOString(),
  period: undefined,
});

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ listId }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IAddGoalPayload>(initialFormData(listId));

  useEffect(() => {
    // if (modal.current) {
    //   modal.current.present();
    //   inputRef.current?.setFocus();
    // }
  }, []);

  const handleOnConfirm = useCallback(() => {
    dispatch(addGoal(formData));
    modal.current?.dismiss().then(() => setFormData(initialFormData(listId)));
  }, [dispatch, formData, listId]);

  const handleOnConfirmSubmodal = useCallback((updatedFields: Partial<IAddGoalPayload>) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  }, []);

  return (
    <IonModal id="create-task-modal" className="ion-padding" ref={modal} trigger={String(listId)}>
      <IonList className="ion-padding">
        <IonItem>
          <IonLabel>Period</IonLabel>
          <IonButton id={PERIOD_PICKER_MODAL_TRIGGER} fill="clear" slot="end" expand="block">
            <IonLabel>
              {formData.period ? `${formData.period?.value} ${formData.period?.type}` : t("none")}
            </IonLabel>
          </IonButton>
          <PeriodPickerModal
            value={formData.period}
            onClick={(period?: IPeriod) => handleOnConfirmSubmodal({ period })}
          />
        </IonItem>
        <IonItem>
          <IonLabel>{t("award")}</IonLabel>
          <IonButton id={AWARD_PICKER_MODAL_TRIGGER} fill="clear" slot="end" expand="block">
            <IonLabel>{formData.points}</IonLabel>
          </IonButton>
          <AwardPickerModal
            value={formData.points}
            onClick={(points?: number) => handleOnConfirmSubmodal({ points })}
            trigger={AWARD_PICKER_MODAL_TRIGGER}
          />
        </IonItem>
        <IonItem>
          <IonLabel>{t("date")}</IonLabel>
          <IonDatetimeButton slot="end" datetime="datetime"></IonDatetimeButton>
          <DatePickerModal
            min={moment().toISOString()}
            max={getMaxDate()}
            value={moment(formData.deadline)}
            onConfirm={(date: moment.Moment) => handleOnConfirmSubmodal({ deadline: date.toISOString() })}
          />
        </IonItem>
      </IonList>
      <h1 className="ion-padding ion-text-center">
        <IonInput
          placeholder="Type here..."
          value={formData.label}
          maxlength={18}
          onIonInput={(event) => handleOnConfirmSubmodal({ label: event.detail.value as string })}
          ref={inputRef}
        />
      </h1>
      <ConfirmButton onClick={handleOnConfirm} disabled={formData.label.length === 0} />
    </IonModal>
  );
};

export default CreateTaskModal;
