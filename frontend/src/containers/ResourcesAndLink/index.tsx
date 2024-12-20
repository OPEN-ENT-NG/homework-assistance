import { FC } from "react";

import { Box, Divider } from "@cgi-learning-hub/ui";
import { useMediaQuery } from "@mui/material";

import { RessourcesAndLinkWrapper } from "./style";
import { Link } from "../Link";
import { Resources } from "../Resources";

export const ResourcesAndLink: FC = () => {
  const isColumn = useMediaQuery("(max-width:1000px)");

  return (
    <Box sx={RessourcesAndLinkWrapper}>
      <Resources />
      <Divider
        sx={isColumn ? {} : { margin: " 0 5rem" }}
        orientation={isColumn ? "horizontal" : "vertical"}
        flexItem
      />
      <Link />
    </Box>
  );
};
