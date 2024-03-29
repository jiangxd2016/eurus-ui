import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCssPlugin from './vite-css-plugin';
import type { InlineConfig } from 'vite';

const config: InlineConfig = {
	mode: 'production',
	resolve: {
		alias: {
			'@/': `${resolve(resolve(), 'src')}/`,
		},
	},
	define: {
		__PROD__: true,
		__DEV__: false,
	},

	build: {
		sourcemap: true,
		// target: 'modules',
		emptyOutDir: false,
		minify: false,
		rollupOptions: {
			input: ['src/index.ts'],
			output: [
				{
					format: 'es',
					dir: 'dist/es',
					exports: 'named',
					entryFileNames: '[name].js',
					preserveModules: true,
					preserveModulesRoot: 'packages',
				},
				{
					format: 'cjs',
					dir: 'dist/lib',
					exports: 'named',
					entryFileNames: '[name].js',
					preserveModules: true,
					preserveModulesRoot: 'packages',
				},
			],

			external: [
				'vue',
				'dayjs',
				'async-validator',
				'number-precision',
				'eurus-icons-vue',
				'resize-observer-polyfill',
			],
		},
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
		},
	},
	plugins: [viteCssPlugin(), vue(), vueJsx()],
};

export default config;
