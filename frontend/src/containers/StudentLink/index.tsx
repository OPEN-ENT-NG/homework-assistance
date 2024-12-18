import { FC } from "react";

import { Box, Typography } from "@cgi-learning-hub/ui";

import { studentLinkWrapper } from "./style";
import { basicTypo } from "~/core/style/style";

export const StudentLink: FC = () => {
  return (
    <Box sx={studentLinkWrapper}>
      <Typography sx={basicTypo}>{"studentLink"}</Typography>
    </Box>
  );
};
