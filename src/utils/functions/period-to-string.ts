import { IPeriod } from "../interfaces/time";

function periodToString(period: IPeriod) {
  return `${period.value} ${period.name}`;
}

export default periodToString;