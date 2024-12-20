import { FC } from "react";

import { Box, Divider } from "@cgi-learning-hub/ui";

import { RessourcesAndLinkWrapper } from "./style";
import { Link } from "../Link";
import { Resources } from "../Resources";

export const ResourcesAndLink: FC = () => {
  return (
    <Box sx={RessourcesAndLinkWrapper}>
      <Resources />
      <Divider orientation="vertical" flexItem />
      <Link />
    </Box>
  );
};
