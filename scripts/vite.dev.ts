import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { InlineConfig } from 'vite';

const config: InlineConfig = {
	mode: 'development',
	resolve: {
		alias: {
			'@/': `${resolve(resolve(), 'src')}/`,
		},
	},
	define: {
		__DEV__: true,
		__PROD__: false,
	},

	build: {
		watch: {},
		minify: false,
		emptyOutDir: false,
		rollupOptions: {
			input: ['src/index.ts'],
			output: [
				{
					format: 'es',
					dir: 'dist/es',
					exports: 'named',
					entryFileNames: '[name].js',
					preserveModules: true,
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
	plugins: [vue(), vueJsx()],
};

export default config;
