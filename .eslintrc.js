module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'array-callback-return': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    quotes: ['error', 'single'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
