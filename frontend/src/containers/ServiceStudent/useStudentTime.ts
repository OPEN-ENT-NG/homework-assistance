import { useMemo } from "react";

import { SelectChangeEvent } from "@mui/material";

import { STUDENT_INPUTS, TIME_UNIT } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

const generateHourRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) =>
    (start + i).toString().padStart(2, "0"),
  );

const generateMinuteRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) =>
    (start + i).toString().padStart(2, "0"),
  );

const getAdjustedEndMinute = (endMinute: number): number => {
  if (endMinute === 0) return 55;
  return Math.max(0, endMinute - 5);
};

export const useStudentTime = () => {
  const { studentInputValue, handleStudentInputChange, timeExclusions } =
    useGlobal();

  return useMemo(() => {
    const { start, end } = timeExclusions.openingTime;
    const startHour = parseInt(start.hour);
    const endHour = parseInt(end.hour);
    const endMinute = parseInt(end.minute);

    const adjustedEndHour = endMinute === 0 ? endHour - 1 : endHour;
    const hours = generateHourRange(startHour, adjustedEndHour);

    const selectedHour =
      studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.HOUR];

    const minutes = (() => {
      const startMinute = parseInt(start.minute);
      const adjustedEndMinute = getAdjustedEndMinute(endMinute);

      if (start.hour === end.hour) {
        return generateMinuteRange(startMinute, adjustedEndMinute).filter(
          (item) => parseInt(item) % 5 === 0,
        );
      }

      if (selectedHour === start.hour) {
        return generateMinuteRange(startMinute, 55).filter(
          (item) => parseInt(item) % 5 === 0,
        );
      }

      if (selectedHour === end.hour) {
        return generateMinuteRange(0, adjustedEndMinute).filter(
          (item) => parseInt(item) % 5 === 0,
        );
      }

      return generateMinuteRange(0, 55).filter(
        (item) => parseInt(item) % 5 === 0,
      );
    })();

    return {
      timeProps: {
        hour: {
          value:
            studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.HOUR],
          possibleValues: hours,
          onChange: (event: SelectChangeEvent) =>
            handleStudentInputChange(STUDENT_INPUTS.SCHEDULED_TIME, {
              ...studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME],
              [TIME_UNIT.HOUR]: event.target.value,
            }),
        },
        minute: {
          value:
            studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.MINUTE],
          possibleValues: minutes,
          onChange: (event: SelectChangeEvent) =>
            handleStudentInputChange(STUDENT_INPUTS.SCHEDULED_TIME, {
              ...studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME],
              [TIME_UNIT.MINUTE]: event.target.value,
            }),
        },
      },
    };
  }, [studentInputValue, handleStudentInputChange, timeExclusions]);
};
