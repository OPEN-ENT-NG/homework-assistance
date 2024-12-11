import { PREVIEW_INPUTS } from "~/core/enums";

export interface InputvalueState {
  [PREVIEW_INPUTS.FIRST_DESC]: string;
  [PREVIEW_INPUTS.SECOND_DESC]: string;
  [PREVIEW_INPUTS.DAYS]: string;
  [PREVIEW_INPUTS.HOURS]: string;
  [PREVIEW_INPUTS.WARNING]: string;
}
