import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import unicorn from 'eslint-plugin-unicorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      unicorn,
    },
    rules: {
      '@next/next/no-img-element': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      'jsx-a11y/alt-text': 'warn',
      'import/no-anonymous-default-export': ['warn', { allowObject: true }],
      'react-hooks/rules-of-hooks': 'error',
      // "no-unused-vars": "warn",
      '@typescript-eslint/no-unused-vars': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [],
        },
      ],
    },
  },
]

export default eslintConfig
