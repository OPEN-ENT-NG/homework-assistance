import { ModalProps } from "~/core/types/types";
import { Exclusion } from "~/providers/GlobalProvider/types";

export interface DeleteClosingPeriodModalProps extends ModalProps {
  closingPeriod: Exclusion;
}
