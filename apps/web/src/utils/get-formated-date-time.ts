import { format, isValid } from "date-fns";

const getFormatedTime = (rawDate: string | null | undefined) => {
  const date = new Date(rawDate ?? "");
  if (!isValid(date)) return "Invalid date";

  return format(date, "dd MMM yyyy, hh:mm a");
};

export default getFormatedTime;
