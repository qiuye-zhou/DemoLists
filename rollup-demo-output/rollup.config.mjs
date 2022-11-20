export default {
    input: 'index.js',
    plugins: [],
    output: [
        {
            file: 'outputs/iife/bundle.js',
            format: 'iife',
            name: 'Test',
            globals: {
                lodash: 'lodash'
            }
        },
        {
            file: 'outputs/cjs/bundle.js',
            format: 'cjs'
        },
        {
            file: 'outputs/amd/bundle.js',
            format: 'amd',
            amd: {
                id: 'Test'
            }
        },
        {
            file: 'outputs/umd/bundle.js',
            format: 'umd',
            name: 'Test',
            globals: {
                lodash: 'lodash'
            },
            amd: {
                id: 'Test'
            }
        },
        {
            file: 'outputs/system/bundle.js',
            format: 'system'
        },
        {
            file: 'outputs/esm/bundle.js',
            format: 'esm'
        }
    ],
    external: ['lodash']
}