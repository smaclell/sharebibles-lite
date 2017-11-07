const colours = {
  white: '#FEFCFD',
  black: '#030303',

  greys: {
    lightest: '#F7F7F7',
    lighter: '#CACACA',
    base: '#8C8C8C',
    darkest: '#1C1C1C',
  },

  teals: {
    base: '#65B7C7',
  },

  oranges: {
    base: '#F75C03',
  },
};

const semantic = {
  text: colours.black,
  buttonText: colours.white,
  secondaryButtonText: colours.greys.base,
  placeholder: colours.greys.base,
  primaryButton: colours.oranges.base,
  secondaryButton: colours.white,
};

export default { ...colours, ...semantic };
