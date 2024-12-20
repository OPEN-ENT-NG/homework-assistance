import { FC } from "react";

import { Box, Typography, Button } from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { adminLinkWrapper } from "./style";
import { validateStudentButtonStyle } from "../ServiceStudent/style";
import { EditableArea } from "~/components/EditableArea";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { PREVIEW_INPUTS } from "~/core/enums";
import { centerBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const Link: FC = () => {
  const {
    isAdmin,
    previewInputValue: { title_link, link, description_link },
    handlePreviewInputChange,
    handleSubmit,
  } = useGlobal();
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  return (
    <Box sx={adminLinkWrapper}>
      <EditableArea
        height="4rem"
        isEditable={isAdmin}
        value={title_link}
        isSmall
        onChange={handlePreviewInputChange(PREVIEW_INPUTS.TITLE_LINK)}
        onSubmit={handleSubmit}
      />
      <EditableArea
        isEditable={isAdmin}
        value={description_link}
        isDescription
        onChange={handlePreviewInputChange(PREVIEW_INPUTS.DESCRIPTION_LINK)}
        onSubmit={handleSubmit}
      />
      {isAdmin ? (
        <>
          <Typography sx={basicTypo}>{t("link.label")}</Typography>
          <EditableArea
            height="6rem"
            isEditable={isAdmin}
            value={link}
            onChange={handlePreviewInputChange(PREVIEW_INPUTS.LINK)}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <Box sx={{ ...centerBoxStyle, flex: 1 }}>
          <Button
            variant="contained"
            sx={validateStudentButtonStyle}
            onClick={() => {
              if (link) {
                window.open(link, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!link}
          >
            {t("link.button")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
