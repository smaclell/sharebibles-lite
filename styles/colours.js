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

  blues: {
    lighter: '#96beff',
    base: '#2f7efc',
  },

  greens: {
    base: '#2fce3c',
  },

  oranges: {
    base: '#F75C03',
  },

  reds: {
    base: '#E53935',
  },
};

const semantic = {
  text: colours.black,
};

export default { ...colours, ...semantic };
