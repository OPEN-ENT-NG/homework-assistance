import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { ressourcesWrapper } from "./style";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const Ressources: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const { resources } = useGlobal();
  console.log(resources);

  return (
    <Box sx={ressourcesWrapper}>
      <Typography sx={basicTypo}>{t("ressources.title")}</Typography>
    </Box>
  );
};
