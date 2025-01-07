import { FC } from "react";

import { Box, Divider } from "@cgi-learning-hub/ui";
import { useMediaQuery } from "@mui/material";

import { RessourcesAndLinkWrapper, ItemWrapper } from "./style";
import { Link } from "../Link";
import { Resources } from "../Resources";

export const ResourcesAndLink: FC = () => {
  const isColumn = useMediaQuery("(max-width:1000px)");

  return (
    <Box sx={RessourcesAndLinkWrapper}>
      <Box sx={ItemWrapper}>
        <Resources />
      </Box>
      <Divider
        sx={isColumn ? { margin: "2rem 0" } : { margin: "0 5rem" }}
        orientation={isColumn ? "horizontal" : "vertical"}
        flexItem
      />
      <Box sx={ItemWrapper}>
        <Link />
      </Box>
    </Box>
  );
};
