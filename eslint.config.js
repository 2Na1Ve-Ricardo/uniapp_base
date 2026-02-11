/* eslint-env node */
const vueTs = require('@vue/eslint-config-typescript')
const prettierConfig = require('@vue/eslint-config-prettier')

module.exports = [
  { ignores: ['dist/**', 'node_modules/**', '*.local', 'pnpm-lock.yaml', '.eslintrc.js', 'eslint.config.js'] },
  ...vueTs.default({ extends: ['recommended'] }),
  prettierConfig,
  {
    files: ['**/*.{vue,js,jsx,ts,tsx,cjs,mjs,cts,mts}'],
    languageOptions: {
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        WechatMiniprogram: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        UniApp: 'readonly',
        UniHelper: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        AnyObject: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 120,
          trailingComma: 'all',
          endOfLine: 'lf',
          useTabs: false,
          tabWidth: 2,
          vueIndentScriptAndStyle: true
        },
      ],
      'vue/multi-word-component-names': ['off'],
      'vue/no-setup-props-destructure': ['off'],
      'vue/no-deprecated-html-element-is': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
    },
  },
  {
    files: ['**/*.d.ts', '**/env.d.ts', '**/shims-uni.d.ts', '**/shime-uni.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': ['off'],
    },
  },
]
