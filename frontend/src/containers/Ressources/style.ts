import {
  columnBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/core/style/boxStyles";

export const ressourcesWrapper = {
  ...columnBoxStyle,
  gap: "1rem",
  width: "50%",
  flex: 1,
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};

export const resourcesMapper = {
  ...flexStartBoxStyle,
  "@media (max-width: 1000px)": {
    ...spaceBetweenBoxStyle,
    flexWrap: "wrap",
  },
};
