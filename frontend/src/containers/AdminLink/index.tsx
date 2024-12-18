import { FC } from "react";

import { Box } from "@cgi-learning-hub/ui";

import { adminLinkWrapper } from "./style";
import { EditableArea } from "~/components/EditableArea";
import { LINK_INPUTS } from "~/core/enums";
import { useGlobal } from "~/providers/GlobalProvider";

export const AdminLink: FC = () => {
  const {
    isAdmin,
    linkInputValues: { title, description, link },
    handleLinkInputChange,
    handleSubmit,
  } = useGlobal();
  return (
    <Box sx={adminLinkWrapper}>
      <EditableArea
        isEditable={isAdmin}
        value={title}
        isSmall
        onChange={handleLinkInputChange(LINK_INPUTS.TITLE)}
        onSubmit={handleSubmit}
      />
      <EditableArea
        isEditable={isAdmin}
        value={description}
        onChange={handleLinkInputChange(LINK_INPUTS.DESCRIPTION)}
        onSubmit={handleSubmit}
      />
      
      <EditableArea
        isEditable={isAdmin}
        value={link}
        onChange={handleLinkInputChange(LINK_INPUTS.LINK)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
