import { columnBoxStyle, spaceBetweenBoxStyle } from "~/core/style/boxStyles";

export const ressourcesWrapper = {
  ...columnBoxStyle,
  gap: "1rem",
  width: "100%",
  maxWidth: "100%",
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};

export const resourcesMapper = {
  ...spaceBetweenBoxStyle,
  justifyContent: "space-around",
  gap: "3.2rem",
  "@media (max-width: 1000px)": {
    flexWrap: "wrap",
  },
};
