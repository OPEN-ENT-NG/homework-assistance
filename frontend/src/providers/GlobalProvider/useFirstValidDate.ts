import { useMemo } from "react";

import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/en";

import {
  OpeningDaysInputValueState,
  TimeExclusionState,
} from "~/providers/GlobalProvider/types";

dayjs.extend(isBetween);
dayjs.locale("en");

export const useFirstValidDate = (timeExclusions: TimeExclusionState) => {
  return useMemo(() => {
    const isDateDisabled = (date: Dayjs): boolean => {
      const isInExclusionPeriod = timeExclusions.exclusions.some(
        (exclusion) => {
          const startDate = dayjs(exclusion.start, "DD/MM/YYYY");
          const endDate = dayjs(exclusion.end, "DD/MM/YYYY");
          return date.isBetween(startDate, endDate, "day", "[]");
        },
      );

      const dayKey = date
        .locale("en")
        .format("dddd")
        .toLowerCase() as keyof OpeningDaysInputValueState;
      const isDayClosed = !timeExclusions.openingDays[dayKey];

      return isInExclusionPeriod || isDayClosed;
    };

    const startDate = dayjs().startOf("day");
    const dates = Array.from({ length: 365 }, (_, i) =>
      startDate.add(i, "day"),
    );

    const firstValidDate = dates.find((date) => !isDateDisabled(date));
    return firstValidDate ?? startDate;
  }, [timeExclusions]);
};
