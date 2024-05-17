const toggleDarkPalette = (shouldAdd: boolean) => {
  document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
};

export default toggleDarkPalette;
