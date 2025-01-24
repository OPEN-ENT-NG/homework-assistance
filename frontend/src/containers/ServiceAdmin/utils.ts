import { useMemo } from "react";

import dayjs from "dayjs";

import { TimeSelectorProps } from "~/components/TimeSelector/types";
import { OPENING_DAYS } from "~/core/enums";
import { TIME_SCOPE, TIME_UNIT } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";
import { Exclusion } from "~/providers/GlobalProvider/types";

import { WeekDayButton } from "./types";

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

export const useTimeSelector = (timeScope: TIME_SCOPE): TimeSelectorProps => {
  const { openingTimeInputValue, handleOpeningTimeInputChange } = useGlobal();

  return useMemo(() => {
    const hours = Array.from({ length: 16 }, (_, i) =>
      (i + 8).toString().padStart(2, "0"),
    );

    const minutes = Array.from({ length: 12 }, (_, i) =>
      (i * 5).toString().padStart(2, "0"),
    );

    return {
      [TIME_UNIT.HOUR]: {
        value: openingTimeInputValue[timeScope][TIME_UNIT.HOUR],
        possibleValues: hours,
        onChange: handleOpeningTimeInputChange(timeScope, TIME_UNIT.HOUR),
      },
      [TIME_UNIT.MINUTE]: {
        value: openingTimeInputValue[timeScope][TIME_UNIT.MINUTE],
        possibleValues: minutes,
        onChange: handleOpeningTimeInputChange(timeScope, TIME_UNIT.MINUTE),
      },
    };
  }, [timeScope, openingTimeInputValue, handleOpeningTimeInputChange]);
};

export const sortExclusionsByStartDate = (
  exclusions: Exclusion[],
): Exclusion[] => {
  return [...exclusions].sort((a, b) => {
    const dateA = dayjs(a.start, "DD/MM/YYYY");
    const dateB = dayjs(b.start, "DD/MM/YYYY");
    return dateA.isBefore(dateB) ? -1 : 1;
  });
};
