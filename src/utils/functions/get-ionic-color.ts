const getIonicColor = (colorName: string) => {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const color = style.getPropertyValue(`--ion-color-${colorName}`);

  return color.trim();
};

export default getIonicColor;

export const PRIMARY_COLOR = getIonicColor("primary"),
  SECONDARY_COLOR = getIonicColor("secondary"),
  TERTIARY_COLOR = getIonicColor("tertiary"),
  LIGHT_COLOR = getIonicColor("light"),
  MEDIUM_COLOR = getIonicColor("medium"),
  BACKGROUND_COLOR = getIonicColor('background'),
  DARK_COLOR = getIonicColor("dark");
