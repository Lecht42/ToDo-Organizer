import { IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";

interface ConfirmButtonsProps {
  onClick: () => void;
  disabled?: boolean;
}

const ConfirmButton: React.FC<ConfirmButtonsProps> = ({ onClick, disabled }) => {
  const { t } = useTranslation();

  return (
    <IonButton className="ion-margin" expand="full" size="large"  disabled={disabled} onClick={onClick}>
      {t("Confirm")}
    </IonButton>
  );
};

export default ConfirmButton;
