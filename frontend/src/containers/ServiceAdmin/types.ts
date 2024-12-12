import { OPENING_DAYS } from "~/core/enums";

export interface WeekDayButton {
  label: string;
  day: OPENING_DAYS;
  onClick: () => void;
  isDayOpen: boolean;
}

export interface DayButtonProps {
    isDayOpen: boolean;
  }
