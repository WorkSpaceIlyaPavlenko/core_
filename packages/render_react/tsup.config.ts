import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    target: 'es2020',
    external: [
        'react',
        'react/jsx-runtime',
        'effector',
        'effector-react'
    ]
});

