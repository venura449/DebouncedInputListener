import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [terser()],
};
