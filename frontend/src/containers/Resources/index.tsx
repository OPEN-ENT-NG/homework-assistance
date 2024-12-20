import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { resourcesMapper, ressourcesWrapper } from "./style";
import { ResourceItem } from "~/components/ResourceItem";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const Resources: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const { resources } = useGlobal();

  return (
    <Box sx={ressourcesWrapper}>
      <Typography sx={basicTypo}>{t("ressources.title")}</Typography>
      <Box sx={resourcesMapper}>
        {resources.map((item) => (
          <ResourceItem
            key={item.idRessource}
            nomRessource={item.nomRessource}
            urlVignette={item.urlVignette}
            urlAccesRessource={item.urlAccesRessource}
            description={item.description}
          />
        ))}
      </Box>
    </Box>
  );
};
