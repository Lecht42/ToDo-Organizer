const getIonicColor = (colorName: string) => {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const color = style.getPropertyValue(`--ion-color-${colorName}`);

  return color.trim();
};

export default getIonicColor;

export const PRIMARY_COLOR = getIonicColor("primary"),
  LIGHT_COLOR = getIonicColor("light");
