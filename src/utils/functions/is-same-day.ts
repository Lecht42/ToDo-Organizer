import moment from "moment";

const isSameDay = (deadline: string) => moment(deadline).isSame(new Date(), "day");

export default isSameDay;