module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-case-declarations': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/destructuring-assignment': 'off',
    'max-len': ['error', { code: 250 }],
    'arrow-parens': ['error', 'always'],
    'object-curly-newline': ['error', { consistent: true }],
    'function-paren-newline': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
