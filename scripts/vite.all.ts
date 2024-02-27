import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { InlineConfig } from 'vite';

const dirname = resolve();

const config: InlineConfig = {
	mode: 'production',
	resolve: {
		alias: {
			'@/': `${resolve(dirname, 'src')}/`,
		},
	},
	define: {
		__PROD__: true,
		__DEV__: false,
	},

	build: {
		sourcemap: true,
		minify: false,
		emptyOutDir: false,
		rollupOptions: {
			output: {
				exports: 'named',
			},
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
			formats: ['es', 'cjs'],
			fileName: module => {
				return `eurus-ui.${module === 'es' ? 'm' : 'c'}js`;
			},
		},
	},
	plugins: [vue(), vueJsx()],
};

export default config;
