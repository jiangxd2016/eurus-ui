import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { expect } from 'vitest';
import EConfigProvider from '..';
import EuButton from '@/packages/button';
import { getPrefixCls } from '@/packages/_utils/global-config';
import { useI18n } from '@/packages/locale';

describe('EConfigProvider', () => {
  it('should work with props', async () => {
    const wrapper = mount(EConfigProvider, {
      props: {
        locale: 'en-us',
        size: 'sm',
        prefixCls: 'test',
        darkMode: true,
      },
      slots: {
        default: defineComponent({
          setup() {
            const { t } = useI18n();
            const prefixCls = getPrefixCls('config-provider');
            return () => (
              <div class={prefixCls}>
                <span class="text">{t('datePicker.today')}</span>
                <EuButton>Test Config Provider</EuButton>
              </div>
            );
          },
        }),
      },
    });

    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.find('.test-config-provider').exists()).toBe(true);
    expect(wrapper.find('.text').text()).toBe('Today');

    const button = wrapper.findComponent(EuButton);
    expect(button.classes()).toContain('test-button--sm');

    // dork mode is not supported yet
  });
});
