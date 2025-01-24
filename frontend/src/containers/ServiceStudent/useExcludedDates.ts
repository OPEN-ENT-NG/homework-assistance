import { useMemo } from "react";

import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/en";

import { useGlobal } from "~/providers/GlobalProvider";
import { OpeningDaysInputValueState } from "~/providers/GlobalProvider/types";

import { UseExcludedDatesProps } from "./types";

dayjs.extend(isBetween);
dayjs.locale("en");

export const useExcludedDates = ({
  minDate = dayjs().startOf("day"),
}: UseExcludedDatesProps = {}) => {
  const { timeExclusions } = useGlobal();

  return useMemo(() => {
    const shouldDisableDate = (date: Dayjs | null): boolean => {
      if (!date) return false;

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

    return {
      datePickerProps: {
        minDate,
        shouldDisableDate,
      },
    };
  }, [timeExclusions, minDate]);
};
