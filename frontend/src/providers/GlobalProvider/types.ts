import { ChangeEvent, ReactNode } from "react";

import { SelectChangeEvent } from "@mui/material";

import {
  MODAL_TYPE,
  OPENING_DAYS,
  PREVIEW_INPUTS,
  TIME_SCOPE,
  TIME_UNIT,
  USER_RIGHT,
} from "~/core/enums";

export interface GlobalProviderProps {
  children: ReactNode;
}

export interface Exclusion {
  start: string;
  end: string;
}

export type PreviewInputvalueState = {
  [key in PREVIEW_INPUTS]: string;
};

export type ExclusionValuesState = Exclusion[];

export type OpeningDaysInputValueState = {
  [key in OPENING_DAYS]: boolean;
};
export type DisplayModalsState = {
  [key in MODAL_TYPE]: boolean;
};

export type OpeningTimeInputValueState = {
  [TIME_SCOPE.START]: {
    [TIME_UNIT.HOUR]: string;
    [TIME_UNIT.MINUTE]: string;
  };
  [TIME_SCOPE.END]: {
    [TIME_UNIT.HOUR]: string;
    [TIME_UNIT.MINUTE]: string;
  };
};

export type GlobalContextType = {
  userRight: USER_RIGHT | null;
  isAdmin: boolean;
  previewInputValue: PreviewInputvalueState;
  handlePreviewInputChange: (
    field: PREVIEW_INPUTS,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  openingDaysInputValue: OpeningDaysInputValueState;
  handleOpeningDaysInputChange: (field: OPENING_DAYS) => void;
  openingTimeInputValue: OpeningTimeInputValueState;
  handleOpeningTimeInputChange: (
    firstField: TIME_SCOPE,
    secondField: TIME_UNIT,
  ) => (event: SelectChangeEvent<string>) => void;
  displayModals: DisplayModalsState;
  toggleModal: (modalType: MODAL_TYPE) => void;
};
