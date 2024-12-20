import { FC } from "react";

import { Box, Card, Typography } from "@cgi-learning-hub/ui";

import {
  cardStyles,
  imageContainerStyles,
  imageStyles,
  contentBoxStyles,
  titleTypographyStyles,
  descriptionTypographyStyles,
} from "./style";
import { ResourceItemProps } from "./types";

export const ResourceItem: FC<ResourceItemProps> = ({
  nomRessource,
  urlAccesRessource,
  urlVignette,
  description,
}) => (
  <Card
    component="a"
    target="_blank"
    rel="noopener noreferrer"
    href={urlAccesRessource}
    sx={cardStyles}
  >
    <Box sx={imageContainerStyles}>
      <img src={urlVignette} alt={nomRessource} style={imageStyles} />
    </Box>

    <Box sx={contentBoxStyles}>
      <Typography sx={titleTypographyStyles}>{nomRessource}</Typography>

      <Typography variant="body2" sx={descriptionTypographyStyles}>
        {description}
      </Typography>
    </Box>
  </Card>
);
