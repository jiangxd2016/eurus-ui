import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import UnoCSS from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, presetWind } from 'unocss';
import ViteRestart from 'vite-plugin-restart';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
	resolve: {
		alias: {
			'eurus-ui/': `${resolve(__dirname, '../dist/es')}/`,
			'dist/': `${resolve(__dirname, '../dist/')}/`,
		},
	},
	server: {
		fs: {
			allow: ['..'],
		},
	},

	plugins: [
		VitePWA({
			manifest: {},
			workbox: { skipWaiting: true, clientsClaim: true },
		}),
		UnoCSS({
			presets: [
				presetUno({
					dark: 'media',
				}),
				presetAttributify(),
				presetWind(),
				presetIcons({
					scale: 1.2,
					warn: true,
				}),
			],
		}),
		ViteRestart({
			reload: ['../dist/es/*'],
		}),
		Inspect(),
	],
});
