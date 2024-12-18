import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { DATE_FORMAT } from "~/core/const";
import { Exclusion } from "~/providers/GlobalProvider/types";

const today = dayjs().format(DATE_FORMAT);

export const initalExclusion: Exclusion = {
  start: today,
  end: today,
};

export const checkForOverlap = (
  newExclusion: Exclusion,
  existingExclusions: Exclusion[],
): boolean => {
  const newStart = dayjs(newExclusion.start, "DD/MM/YYYY");
  const newEnd = dayjs(newExclusion.end, "DD/MM/YYYY");

  return existingExclusions.some((existing) => {
    const existingStart = dayjs(existing.start, "DD/MM/YYYY");
    const existingEnd = dayjs(existing.end, "DD/MM/YYYY");

    const startOverlaps =
      newStart.isSameOrAfter(existingStart, "day") &&
      newStart.isSameOrBefore(existingEnd, "day");
    const endOverlaps =
      newEnd.isSameOrAfter(existingStart, "day") &&
      newEnd.isSameOrBefore(existingEnd, "day");

    const encompassing =
      newStart.isBefore(existingStart, "day") &&
      newEnd.isAfter(existingEnd, "day");

    return startOverlaps || endOverlaps || encompassing;
  });
};
