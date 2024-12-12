import { ChangeEvent, ReactNode } from "react";

import { OPENING_DAYS, PREVIEW_INPUTS, USER_RIGHT } from "~/core/enums";

export interface GlobalProviderProps {
  children: ReactNode;
}

export type PreviewInputvalueState = {
  [key in PREVIEW_INPUTS]: string;
};

export type OpeningDaysInputValueState = {
  [key in OPENING_DAYS]: boolean;
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
};
