import { useMemo } from "react";

import { WeekDayButton } from "./types";
import { OPENING_DAYS } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

const WEEK_DAYS_CONFIG = [
  { label: "L", day: OPENING_DAYS.MONDAY },
  { label: "M", day: OPENING_DAYS.TUESDAY },
  { label: "M", day: OPENING_DAYS.WEDNESDAY },
  { label: "J", day: OPENING_DAYS.THURSDAY },
  { label: "V", day: OPENING_DAYS.FRIDAY },
  { label: "S", day: OPENING_DAYS.SATURDAY },
  { label: "D", day: OPENING_DAYS.SUNDAY },
] as const;

export const useWeekDaysButtonsConfig = (): WeekDayButton[] => {
  const { handleOpeningDaysInputChange, openingDaysInputValue } = useGlobal();

  return useMemo(
    () =>
      WEEK_DAYS_CONFIG.map(({ label, day }) => ({
        label,
        day,
        onClick: () => handleOpeningDaysInputChange(day),
        isDayOpen: openingDaysInputValue[day],
      })),
    [openingDaysInputValue],
  );
};
