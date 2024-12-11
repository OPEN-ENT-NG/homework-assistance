import { ChangeEvent, FC, useState } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import {
  datesWrapper,
  previewWrapper,
  secondPartTitle,
  secondPartWrapper,
  SVGWrapper,
} from "./style";
import { InputvalueState } from "./types";
import { initialInputvalue } from "./utils";
import { EditableArea } from "~/components/EditableArea";
import { PREVIEW_INPUTS } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";
import { SecondpartPreviewIcon } from "~/components/SVG/SecondpartPreviewIcon";
import EventIcon from "@mui/icons-material/Event";

export const Preview: FC = () => {
  const [inputValue, setInputValue] =
    useState<InputvalueState>(initialInputvalue);
  const { isAdmin } = useGlobal();
  const { t } = useTranslation("homework-assistance");
  const { FIRST_DESC, SECOND_DESC, HOURS, DAYS, WARNING } = inputValue;

  const handleInputChange =
    (field: PREVIEW_INPUTS) => (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  const handleSubmit = (previewType: PREVIEW_INPUTS) => () => {
    console.log(inputValue[previewType]);
  };

  return (
    <Box sx={previewWrapper}>
      <EditableArea
        isEditable={isAdmin}
        onChange={handleInputChange(PREVIEW_INPUTS.FIRST_DESC)}
        value={FIRST_DESC}
        height="10rem"
        onSubmit={handleSubmit(PREVIEW_INPUTS.FIRST_DESC)}
      />
      <EditableArea
        isEditable={isAdmin}
        onChange={handleInputChange(PREVIEW_INPUTS.SECOND_DESC)}
        value={SECOND_DESC}
        height="13rem"
        onSubmit={handleSubmit(PREVIEW_INPUTS.SECOND_DESC)}
      />
      <Typography sx={secondPartTitle}>
        {t("homework-assistance.availabilityTitle")}
      </Typography>
      <Box sx={secondPartWrapper}>
        <Box sx={datesWrapper}>
          <EditableArea
            icon={<EventIcon />}
            isEditable={isAdmin}
            onChange={handleInputChange(PREVIEW_INPUTS.DAYS)}
            value={DAYS}
            height="3rem"
            onSubmit={handleSubmit(PREVIEW_INPUTS.DAYS)}
          />
          <EditableArea
            isEditable={isAdmin}
            onChange={handleInputChange(PREVIEW_INPUTS.HOURS)}
            value={HOURS}
            height="3rem"
            onSubmit={handleSubmit(PREVIEW_INPUTS.HOURS)}
          />
          <EditableArea
            isEditable={isAdmin}
            onChange={handleInputChange(PREVIEW_INPUTS.WARNING)}
            value={WARNING}
            height="3rem"
            onSubmit={handleSubmit(PREVIEW_INPUTS.WARNING)}
          />
        </Box>
        <Box sx={SVGWrapper}>
          <SecondpartPreviewIcon />
        </Box>
      </Box>
    </Box>
  );
};
