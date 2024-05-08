import { IonChip } from "@ionic/react";

interface PointsChipProps {
    points : number
} 

const PointsChip: React.FC<PointsChipProps> = ({points}) => {
  return <IonChip color="warning">{`+${points}￠`}</IonChip>;
};

export default PointsChip;
