const getIonicColor = (colorName: string) => {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const color = style.getPropertyValue(`--ion-color-${colorName}`);

  return color.trim();
};

export default getIonicColor;
