import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import configProvider from '@/packages/config-provider';
import { useI18n } from '..';

describe('locale', () => {
	it('should work use default language(zh-cn)', async () => {
		const { t } = useI18n();
		expect(t('datePicker.today')).toMatchInlineSnapshot('"今天"');
	});
	it('should work with config-provider locale', async () => {
		const wrapper = mount(configProvider, {
			props: {
				locale: 'en-us',
			},
			slots: {
				default: defineComponent({
					setup() {
						const { t } = useI18n();
						return () => <div>{t('datePicker.today')}</div>;
					},
				}),
			},
		});
		await nextTick();
		expect(wrapper.text()).toMatchInlineSnapshot('"Today"');
	});
});
