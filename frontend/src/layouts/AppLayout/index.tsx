import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { GlobalStyles } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  appIconWrapper,
  mainLayout,
  globalStyle,
  titleBox,
  titleStyle,
  bottomItemStyle,
  containerStyle,
  topItemStyle,
  topRowStyle,
} from "./style";
import { AppLayoutProps } from "./types";
import { HomeworkAssistanceIcon } from "~/components/SVG/HomeworkAssistanceIcon";
import { appIconColor } from "~/core/style/style";

export const AppLayout: FC<AppLayoutProps> = ({ items }) => {
  const { t } = useTranslation("homework-assistance");
  const { firstItem, secondItem, thirdItem } = items;
  return (
    <>
      <GlobalStyles styles={globalStyle} />
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
    </>
  );
};
