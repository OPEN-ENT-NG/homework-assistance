import { InputvalueState } from "./types";
import { PREVIEW_INPUTS } from "~/core/enums";

export const initialInputvalue: InputvalueState = {
  [PREVIEW_INPUTS.FIRST_DESC]: "",
  [PREVIEW_INPUTS.SECOND_DESC]: "",
  [PREVIEW_INPUTS.DAYS]: "",
  [PREVIEW_INPUTS.HOURS]: "",
  [PREVIEW_INPUTS.WARNING]: "",
};
