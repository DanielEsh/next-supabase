import '@trivago/prettier-plugin-sort-imports'
import * as tailwindcssPlugin from 'prettier-plugin-tailwindcss'

export default {
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  bracketSameLine: false,
  singleAttributePerLine: true,
  trailingComma: 'all',
  endOfLine: 'auto',

  plugins: [tailwindcssPlugin, '@trivago/prettier-plugin-sort-imports'],

  // sort order
  importOrder: [
    '^react(.*)',
    '^next(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
}
