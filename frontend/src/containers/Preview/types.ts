import { ReactNode } from "react";

import { PREVIEW_INPUTS } from "~/core/enums";

export interface EditableAreaConfig {
  field: PREVIEW_INPUTS;
  height?: string;
  icon: ReactNode;
  isSmall: boolean;
}
