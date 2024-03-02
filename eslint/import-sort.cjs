module.exports = {
    'plugins': [
        'simple-import-sort'
    ],
    'overrides': [
        {
            'files': ['**/*.js', '**/*.ts', '**/*.tsx'],
            'rules': {
                'simple-import-sort/imports': [
                    'error',
                    {
                        'groups': [
                            // `react` first, `next` second, then packages starting with a character
                            ['^react$', '^next', '^[a-z]'],
                            // Packages starting with `@`
                            ['^@'],
                            // Packages starting with `~`
                            ['^~'],
                            // Imports starting with `../`
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Imports starting with `./`
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports
                            ['^.+\\.s?css$'],
                            // Side effect imports
                            ['^\\u0000']
                        ]
                    }
                ]
            }
        }
    ],
    'rules': {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error'
    }
};
