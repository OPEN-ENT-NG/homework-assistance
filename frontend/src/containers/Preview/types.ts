import { PREVIEW_INPUTS } from "~/core/enums";

export interface InputvalueState {
  [PREVIEW_INPUTS.HEADER]: string;
  [PREVIEW_INPUTS.BODY]: string;
  [PREVIEW_INPUTS.DAYS]: string;
  [PREVIEW_INPUTS.TIME]: string;
  [PREVIEW_INPUTS.INFO]: string;
}

export interface EditableAreaConfig {
  field: PREVIEW_INPUTS;
  height: string;
  icon: React.ReactNode;
  isSmall: boolean;
}
