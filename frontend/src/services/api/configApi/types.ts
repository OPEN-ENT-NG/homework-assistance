import {
  Exclusion,
  OpeningDaysInputValueState,
  OpeningTimeInputValueState,
  PreviewInputvalueState,
} from "~/providers/GlobalProvider/types";

export interface ConfigPayload {
  id: string | null;
  messages: PreviewInputvalueState;
  settings: {
    exclusions: Exclusion[];
    opening_days: OpeningDaysInputValueState;
    opening_time: OpeningTimeInputValueState;
  };
}
