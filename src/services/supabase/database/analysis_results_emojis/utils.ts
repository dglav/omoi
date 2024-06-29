import { format } from "@formkit/tempo";

export const convertStartEndDateToDateSpan = (startDate: Date, endDate: Date) =>
  `${format(startDate, "YYYY/MM/DD")}_${format(endDate, "YYYY/MM/DD")} `;
