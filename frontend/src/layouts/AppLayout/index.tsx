import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import {
  appIconWrapper,
  mainLayout,
  titleBox,
  titleStyle,
  bottomItemStyle,
  containerStyle,
  topItemStyle,
  topRowStyle,
} from "./style";
import { AppLayoutProps } from "./types";
import { HomeworkAssistanceIcon } from "~/components/SVG/HomeworkAssistanceIcon";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { appIconColor } from "~/core/style/style";

export const AppLayout: FC<AppLayoutProps> = ({ items }) => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const { firstItem, secondItem, thirdItem } = items;
  return (
    <Box sx={mainLayout}>
      <Box sx={titleBox}>
        <Box sx={appIconWrapper}>
          <HomeworkAssistanceIcon fill={appIconColor} />
        </Box>
        <Typography sx={titleStyle}>
          {t("homework-assistance.title")}
        </Typography>
      </Box>
      <Box sx={containerStyle}>
        <Box sx={topRowStyle}>
          <Box sx={topItemStyle}>{firstItem}</Box>
          <Box sx={topItemStyle}>{secondItem}</Box>
        </Box>
        <Box sx={bottomItemStyle}>{thirdItem}</Box>
      </Box>
    </Box>
  );
};
