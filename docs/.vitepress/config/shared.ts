import { defineConfig } from 'vitepress';
import { mdPlugin } from '../utils/demo';

export const META_URL = 'https://eurus-ui.netlify.app/';
export const META_TITLE = 'Eurus UI';
export const RELEASES = 'https://github.com/jiangxd2016/eurus-ui/releases';
export const ISSUES = 'https://github.com/jiangxd2016/eurus-ui/issues';
export const DISCUSSIONS = 'https://github.com/jiangxd2016/eurus-ui/discussions';
export const CHANGELOG = 'https://github.com/jiangxd2016/eurus-ui/blob/main/CHANGELOG.md';

export const sharedConfig = defineConfig({
	title: META_TITLE,
	head: [
		['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
		['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],

		['meta', { name: 'wwads-cn-verify', content: '5878a7ab84fb43402106c575658472fa' }],

		[
			'meta',
			{
				property: 'og:type',
				content: 'website',
			},
		],

		[
			'meta',
			{
				property: 'twitter:card',
				content: 'summary_large_image',
			},
		],
	],

	lastUpdated: true,
	lang: 'zh',
	themeConfig: {
		logo: '/logo.png',

		algolia: {
			appId: '50TTAEFR5V',
			apiKey: 'c0c3101b6a4ea819d26f3200382646a7',
			indexName: 'eurus-ui',
		},
		editLink: {
			pattern: 'iangxd2016/eurus-ui',
			text: 'Edit this page on GitHub',
		},
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/jiangxd2016/eurus-ui',
			},
		],

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2019-present jiangxd',
		},
	},
	markdown: {
		config: md => mdPlugin(md),
	},
});
