import { FC } from "react";

import { Box, Divider } from "@cgi-learning-hub/ui";

import { RessourcesAndLinkWrapper } from "./style";
import { AdminLink } from "../AdminLink";
import { Ressources } from "../Ressources";
import { StudentLink } from "../StudentLink";
import { useGlobal } from "~/providers/GlobalProvider";

export const RessourcesAndLink: FC = () => {
  const { isAdmin } = useGlobal();
  return (
    <Box sx={RessourcesAndLinkWrapper}>
      <Ressources />
      <Divider orientation="vertical" flexItem />
      {isAdmin ? <AdminLink /> : <StudentLink />}
    </Box>
  );
};
