import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { resourcesMapper, ressourcesWrapper } from "./style";
import { secondPartTitle } from "../Preview/style";
import { ResourceItem } from "~/components/ResourceItem";
import { ResourcesEmptyState } from "~/components/SVG/ResourcesEmptyState";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { columnBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const Resources: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const { resources } = useGlobal();

  return (
    <Box sx={ressourcesWrapper}>
      <Typography sx={secondPartTitle}>{t("resources.title")}</Typography>
      <Box sx={resourcesMapper}>
        {resources.length ? (
          resources.map((item) => (
            <ResourceItem
              key={item.idRessource}
              nomRessource={item.nomRessource}
              urlVignette={item.urlVignette}
              urlAccesRessource={item.urlAccesRessource}
              description={item.description}
            />
          ))
        ) : (
          <Box
            sx={{
              ...columnBoxStyle,
              alignItems: "center",
              gap: "1.6rem",
              paddingTop: "3rem",
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ height: "fit-content" }}>
              <ResourcesEmptyState />
            </Box>
            <Typography sx={basicTypo}>{t("resources.empty")}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
