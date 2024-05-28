import { IonModal, IonList, IonItem, IonLabel, IonButton, IonDatetimeButton, IonInput } from "@ionic/react";
import moment from "moment";
import { useRef, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../redux/hooks";
import { IAddGoalPayload, addGoal, updateGoal } from "../../../../redux/reducers/goals-slice";
import getMaxDate from "../../../../utils/functions/get-max-date";
import IPeriod from "../../../../utils/interfaces/period";
import ConfirmButton from "../../../buttons/confirm-button/confirm-button";
import DatePickerModal from "../date-picker/date-picker";
import PeriodPickerModal, { PERIOD_PICKER_MODAL_TRIGGER } from "../period-picker/period-picker";
import PointsPickerModal, { AWARD_PICKER_MODAL_TRIGGER } from "../points-picker/points-picker";

interface CreateTaskModalProps {
  listId: number;
  initialData?: IAddGoalPayload;
  onClose: () => void;
}

const initialFormData = (listId: number, initialData?: IAddGoalPayload) => ({
  attachedListId: listId,
  label: initialData?.label || "",
  points: initialData?.points || 5,
  deadline: initialData?.deadline || moment().toISOString(),
  period: initialData?.period || undefined,
  completed: initialData?.completed || false,
  id: initialData?.id,
});

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ listId, initialData, onClose }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IAddGoalPayload>(initialFormData(listId, initialData));

  useEffect(() => {
    setFormData(initialFormData(listId, initialData));
  }, [listId, initialData]);

  const handleOnConfirm = useCallback(() => {
    if (formData.id) {
      dispatch(updateGoal(formData));
    } else {
      dispatch(addGoal(formData));
    }
    modal.current?.dismiss().then(onClose);
  }, [dispatch, formData, onClose]);

  const handleOnConfirmSubmodal = useCallback((updatedFields: Partial<IAddGoalPayload>) => {
    setFormData((prev) => ({ ...prev, ...updatedFields }));
  }, []);

  const dateTimePicker = "task-date-picker";

  return (
    <IonModal id="create-task-modal" className="ion-padding" ref={modal} isOpen={true} onDidDismiss={onClose}>
      <IonList lines="full" className="ion-padding">
        <IonItem>
          <IonLabel>Period</IonLabel>
          <IonButton id={PERIOD_PICKER_MODAL_TRIGGER} fill="clear" slot="end" expand="block">
            <IonLabel>
              <h3>{formData.period ? `${t("every")} ${formData.period?.value} ${formData.period?.type}` : t("none")}</h3>
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
            <IonLabel>
              <h2>{formData.points}</h2>
            </IonLabel>
          </IonButton>
          <PointsPickerModal
            value={formData.points}
            onConfirm={(points?: number) => handleOnConfirmSubmodal({ points })}
            trigger={AWARD_PICKER_MODAL_TRIGGER}
          />
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>{t("date")}</h2>
          </IonLabel>
          <IonDatetimeButton slot="end" datetime={dateTimePicker}></IonDatetimeButton>
          <DatePickerModal
            min={moment().toISOString()}
            max={getMaxDate()}
            datetime={dateTimePicker}
            value={moment(formData.deadline)}
            onConfirm={(date: moment.Moment) => handleOnConfirmSubmodal({ deadline: date.toISOString() })}
          />
        </IonItem>
      </IonList>
      <h1 className="ion-padding ion-text-center">
        <IonInput
          placeholder="Type here..."
          value={formData.label}
          maxlength={16}
          onIonInput={(event) => handleOnConfirmSubmodal({ label: event.detail.value as string })}
          ref={inputRef}
        />
      </h1>
      <ConfirmButton onClick={handleOnConfirm} disabled={formData.label.length === 0} />
    </IonModal>
  );
};

export default CreateTaskModal;
