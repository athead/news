module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeautures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'fsdm'],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',

        // 'no-unused-vars': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error', // for correct unused variables

        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off', // warn
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        // 'import/no-extraneous-dependencies': 'warn',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-underscore-dangle': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true,
            },
        ],
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to', 'key'],
            },
        ],
        'arrow-body-style': ['warn', 'always'],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'warn',
        'fsdm/path-checker': ['error', { alias: '@' }],
        'fsdm/public-api-imports': [
            'error',
            { alias: '@', testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'] },
        ],
        'fsdm/layer-imports': ['error', { alias: '@', ignoreImportPatterns: ['**/StoreProvider', '**/testing'] }],
    },
    overrides: [
        {
            files: ['./src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
};
