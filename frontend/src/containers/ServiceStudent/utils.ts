import { useMemo } from "react";

import { SelectChangeEvent } from "@mui/material";

import { STUDENT_INPUTS, TIME_UNIT } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

export const useStudentTime = () => {
  const { studentInputValue, handleStudentInputChange } = useGlobal();

  return useMemo(() => {
    const hours = Array.from({ length: 16 }, (_, i) =>
      (i + 8).toString().padStart(2, "0"),
    );

    const minutes = Array.from({ length: 12 }, (_, i) =>
      (i * 5).toString().padStart(2, "0"),
    );

    const timeProps = {
      hour: {
        value: studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.HOUR],
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
    };

    return { timeProps };
  }, [studentInputValue, handleStudentInputChange]);
};
