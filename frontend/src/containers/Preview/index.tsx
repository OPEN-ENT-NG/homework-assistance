import { FC, useMemo } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import {
  datesWrapper,
  previewWrapper,
  secondPartTitle,
  secondPartWrapper,
  SVGWrapper,
} from "./style";
import { EditableAreaConfig } from "./types";
import { dateAreaConfigs, previewAreaConfigs } from "./utils";
import { EditableArea } from "~/components/EditableArea";
import { SecondpartPreviewIcon } from "~/components/SVG/SecondpartPreviewIcon";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { PREVIEW_INPUTS } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

export const Preview: FC = () => {
  const { isAdmin, previewInputValue, handlePreviewInputChange } = useGlobal();
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const handleSubmit = (previewType: PREVIEW_INPUTS) => () => {
    console.log(previewInputValue[previewType]);
  };

  const renderEditableArea = (props: EditableAreaConfig) => (
    <EditableArea
      key={props.field}
      isEditable={isAdmin}
      onChange={handlePreviewInputChange(props.field)}
      value={previewInputValue[props.field]}
      height={props.height}
      onSubmit={handleSubmit(props.field)}
      icon={props.icon}
      isSmall={props.isSmall}
    />
  );

  const previewAreaInputs = useMemo(
    () => previewAreaConfigs.map((item) => renderEditableArea(item)),
    [isAdmin, previewInputValue],
  );

  const dateAreaInputs = useMemo(
    () => dateAreaConfigs.map((item) => renderEditableArea(item)),
    [isAdmin, previewInputValue],
  );

  return (
    <Box sx={previewWrapper}>
      {previewAreaInputs}
      <Box sx={secondPartWrapper}>
        <Box sx={datesWrapper}>
          <Typography sx={secondPartTitle}>
            {t("homework-assistance.availabilityTitle")}
          </Typography>
          {dateAreaInputs}
        </Box>
        <Box sx={SVGWrapper}>
          <SecondpartPreviewIcon />
        </Box>
      </Box>
    </Box>
  );
};
