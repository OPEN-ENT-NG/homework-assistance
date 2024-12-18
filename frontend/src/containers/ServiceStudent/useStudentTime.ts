import { useMemo } from "react";

import { SelectChangeEvent } from "@mui/material";

import { STUDENT_INPUTS, TIME_UNIT } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

const generateTimeRange = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, i) =>
    (start + i).toString().padStart(2, "0"),
  );

export const useStudentTime = () => {
  const { studentInputValue, handleStudentInputChange, timeExclusions } =
    useGlobal();

  return useMemo(() => {
    const startHour = parseInt(timeExclusions.openingTime.start.hour);
    const endHour = parseInt(timeExclusions.openingTime.end.hour);
    const hours = generateTimeRange(startHour, endHour);

    const selectedHour =
      studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.HOUR];
    const { start, end } = timeExclusions.openingTime;

    const minutes = (() => {
      if (selectedHour === start.hour) {
        return generateTimeRange(parseInt(start.minute), 55).filter(
          (item) => parseInt(item) % 5 === 0,
        );
      }

      if (selectedHour === end.hour) {
        return generateTimeRange(0, parseInt(end.minute)).filter(
          (item) => parseInt(item) % 5 === 0,
        );
      }

      return generateTimeRange(0, 55).filter(
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
