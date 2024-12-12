import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { EditableAreaConfig, InputvalueState } from "./types";
import { PREVIEW_INPUTS } from "~/core/enums";

export const initialInputvalue: InputvalueState = {
  [PREVIEW_INPUTS.HEADER]: "",
  [PREVIEW_INPUTS.BODY]: "",
  [PREVIEW_INPUTS.DAYS]: "",
  [PREVIEW_INPUTS.TIME]: "",
  [PREVIEW_INPUTS.INFO]: "",
};

export const previewAreaConfigs: EditableAreaConfig[] = [
  {
    field: PREVIEW_INPUTS.HEADER,
    height: "10rem",
    icon: null,
    isSmall: false,
  },
  {
    field: PREVIEW_INPUTS.BODY,
    height: "13rem",
    icon: null,
    isSmall: false,
  },
];

export const dateAreaConfigs: EditableAreaConfig[] = [
  {
    field: PREVIEW_INPUTS.DAYS,
    height: "4rem",
    icon: <EventIcon fontSize="inherit" />,
    isSmall: true,
  },
  {
    field: PREVIEW_INPUTS.TIME,
    height: "4rem",
    icon: <AccessTimeIcon fontSize="inherit" />,
    isSmall: true,
  },
  {
    field: PREVIEW_INPUTS.INFO,
    height: "4rem",
    icon: <InfoOutlinedIcon fontSize="inherit" />,
    isSmall: true,
  },
];
