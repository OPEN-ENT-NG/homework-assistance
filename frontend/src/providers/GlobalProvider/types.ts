import { ChangeEvent, ReactNode } from "react";

import { PREVIEW_INPUTS, USER_RIGHT } from "~/core/enums";

export interface GlobalProviderProps {
  children: ReactNode;
}

export interface PreviewInputvalueState {
  [PREVIEW_INPUTS.HEADER]: string;
  [PREVIEW_INPUTS.BODY]: string;
  [PREVIEW_INPUTS.DAYS]: string;
  [PREVIEW_INPUTS.TIME]: string;
  [PREVIEW_INPUTS.INFO]: string;
}

export type GlobalContextType = {
  userRight: USER_RIGHT | null;
  isAdmin: boolean;
  previewInputValue: PreviewInputvalueState;
  handlePreviewInputChange: (
    field: PREVIEW_INPUTS,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};
