import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { serviceStudentWrapper } from "./style";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { basicTypo } from "~/core/style/style";

export const ServiceStudent: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  return (
    <Box sx={serviceStudentWrapper}>
      <Typography sx={basicTypo}>{t("student.title")}</Typography>
    </Box>
  );
};
