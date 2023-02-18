import type { PropType } from 'vue';
import { defineComponent, getCurrentInstance, provide, reactive, renderSlot, toRefs } from 'vue';
import './style.scss';
import type { language } from '@/packages/_utils/constants';
import type { Size } from '@/packages/_utils/size';
import { configProviderInjectionKey } from '@/packages/_utils/constants';

const EConfigProviderProps = {
  locale: {
    type: String as PropType<language>,
    default: 'zh-cn',
  },
  prefixCls: {
    type: String,
    default: 'E',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  global: {
    type: Boolean,
    default: false,
  },
  // TODO: dark mode
  darkMode: {
    type: Boolean,
    default: false,
  }
};

export default defineComponent({
  name: 'EConfigProvider',
  props: EConfigProviderProps,
  setup(props, { slots }) {

    const { prefixCls, locale, size, darkMode } = toRefs(props);
    const config = reactive({
      prefixCls,
      locale,
      size,
      darkMode
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
