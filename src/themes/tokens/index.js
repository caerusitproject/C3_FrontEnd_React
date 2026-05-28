import { globalTokens } from "./globalTokens";
import { lightOrangeTheme } from "./lightOrange";
import { lightOliveGreenTheme } from "./lightOliveGreen";
import { darkGreenTheme } from "./darkGreen";

export { globalTokens, lightOrangeTheme, lightOliveGreenTheme, darkGreenTheme };

export const THEME_IDS = {
  LIGHT_ORANGE: "lightOrange",
  LIGHT_OLIVE_GREEN: "lightOliveGreen",
  DARK_GREEN: "darkGreen",
};

export const THEME_REGISTRY = {
  lightOrange: lightOrangeTheme,
  lightOliveGreen: lightOliveGreenTheme,
  darkGreen: darkGreenTheme,
};

export const DEFAULT_THEME_ID = THEME_IDS.LIGHT_OLIVE_GREEN;

export const getTheme = (id) =>
  THEME_REGISTRY[id] ?? THEME_REGISTRY[DEFAULT_THEME_ID];
