import dayjs from "dayjs";

import { DATE_FORMAT } from "~/core/const";
import { Exclusion } from "~/providers/GlobalProvider/types";

const today = dayjs().format(DATE_FORMAT);

export const initalExclusion: Exclusion = {
  start: today,
  end: today,
};
