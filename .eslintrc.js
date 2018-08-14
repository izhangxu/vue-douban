module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': 'off',
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'warn',
    'max-len': 'off',
    'no-await-in-loop': 'off',
    'no-loop-func': 'off',
    'no-continue': 'off',
    'consistent-return': 'off',
    'radix': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'no-shadow': ['error', {
      'allow': ['state']
    }],
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}