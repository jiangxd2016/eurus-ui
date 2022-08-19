import type { PropType } from 'vue';
import { renderSlot, getCurrentInstance, provide, reactive, toRefs, defineComponent } from 'vue';
import type { language } from '@/packages/locale';
import { configProviderInjectionKey } from '@/packages/_utils/global-config';
import type { Size } from '@/packages/_utils';

const EConfigProviderProps = {
  locale: {
    type: String as PropType<language>,
    default: 'zh-cn',
  },
  prefixCls: {
    type: String,
    default: 'E',
  },
  /**
     * 大小
     */
  size: {
    type: String as PropType<Size>,
  },
  /**
     * 是否全局生效
     */
  global: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EConfigProvider',
  props: EConfigProviderProps,
  setup(props, { slots, emit }) {

    const { prefixCls, locale, size } = toRefs(props);
    const config = reactive({
      slots,
      prefixCls,
      locale,
      size,
    });
    if (props.global) {
      const instance = getCurrentInstance();
      if (instance) {
        instance.appContext.app.provide(configProviderInjectionKey, config);
      }
    } else {
      provide(configProviderInjectionKey, config);
    }
    return () => renderSlot(slots, 'default', { config });
  },
});
