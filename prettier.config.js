/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  experimentalTernaries: true,
  printWidth: 80,
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports'
  ],
  overrides: [
    {
      files: '*.yml',
      options: {
        useTabs: true,
        tabWidth: 1,
      },
    },
  ],
  importOrder: [
    '', // Enforce a blank line after top of file comments

    // Group type imports separately from values
    // "<TYPES>^(node:)",
    // "<TYPES>",
    // "<TYPES>^[.]",

    // Node.js built-in modules
    '<BUILTIN_MODULES>',
    // Imports not matched by other special words or groups.
    '<THIRD_PARTY_MODULES>',
    '',
    '^(@angular/(.*)$)|^(@angular$)',
    '^(@nestjs/(.*)$)|^(@nestjs$)',
    '',
    "^(@api|@assets|@ui)(/.*)$",
    '',
    // Group aliases with local imports
    // Internal packages.
    '^@/env(.*)$',
    '^@(?!/)',
    '^@/(.*)$',
    // Relative imports
    '^../(.*)$',
    '^[.]',
    // Keep css modules at the bottom
    '^(?!.*[.]css$)[./].*$',
    '.css$',
    '^.+\\.?(css)$',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderTypeScriptVersion: '5.0.0',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderCaseSensitive: false,
};

module.exports = config;
// export default config;
