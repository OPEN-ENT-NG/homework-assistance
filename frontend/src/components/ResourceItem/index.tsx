import { FC } from "react";

import { Box, Card, Typography } from "@cgi-learning-hub/ui";

import { ResourceItemProps } from "./types";

export const ResourceItem: FC<ResourceItemProps> = ({
  nomRessource,
  urlAccesRessource,
  urlVignette,
  description,
}) => (
  <Card
    component="a"
    href={urlAccesRessource}
    sx={{
      padding: ".5rem",
      display: "flex",
      width: "12rem", // Gardé car c'est déjà en rem
      height: "17.5rem",
      flexDirection: "column",
      textDecoration: "none",
      cursor: "pointer",
      border: "none",
      boxShadow: "none",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.02)",
      },
    }}
  >
    <Box
      sx={{
        height: "12.5rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={urlVignette}
        alt={nomRessource}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </Box>

    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography
        sx={{
          fontWeight: "500",
          color: "secondary.main",
          fontSize: "1.4rem",
          lineHeight: "2.1rem",
          textAlign: "center",
        }}
      >
        {nomRessource}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontWeight: "400",
          color: "grey.dark",
          fontSize: "1.1rem",
          lineHeight: "1.2rem",
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </Box>
  </Card>
);
