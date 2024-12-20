import { FC } from "react";

import { Box, Divider } from "@cgi-learning-hub/ui";

import { RessourcesAndLinkWrapper } from "./style";
import { Link } from "../Link";
import { Ressources } from "../Ressources";

export const RessourcesAndLink: FC = () => {
  return (
    <Box sx={RessourcesAndLinkWrapper}>
      <Ressources />
      <Divider orientation="vertical" flexItem />
      <Link />
    </Box>
  );
};
