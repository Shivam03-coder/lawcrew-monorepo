import { format } from "date-fns";

const getFormatedTime = (rawDate: string) => {
  return format(new Date(rawDate), "dd MMM yyyy, hh:mm a");
};

export default getFormatedTime;
