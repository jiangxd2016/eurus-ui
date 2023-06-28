import { ref, reactive, inject, computed } from 'vue';
import zhCN from './lang/zh-cn';
import enUS from './lang/en-us';
import jaJP from './lang/ja-jp';
import { EurusConfigProviderKey } from '@/packages/_utils/constants';
import { isString } from '@/packages/_utils/is';

export type language = 'zh-cn' | 'en-us';

type i18nMessage = Record<string, typeof zhCN>;

const LOCALE = ref<language>('zh-cn');
const I18N_MESSAGES = reactive<i18nMessage>({
  'zh-cn': zhCN,
  'en-us': enUS,
  'ja-jp': jaJP,
});

/**
 * 添加地区语言包。添加过后的语言包可以通过 `useLocale` 使用
 * @param messages 需要添加的地区语言数据
 * @param options
 */
export const addI18nMessages = (
  messages: i18nMessage,
  options?: {
    overwrite?: boolean;
  },
) => {
  for (const key of Object.keys(messages)) {
    if (!I18N_MESSAGES[key] || options?.overwrite) {
      I18N_MESSAGES[key] = messages[key];
    }
  }
};

/**
 * 切换地区语言。
 */
export const useLocale = (locale: string) => {
  if (!I18N_MESSAGES[locale]) {
    console.warn(`use ${locale} failed! Please add ${locale} first`);
    return;
  }
  LOCALE.value = locale as language;
};

/**
 * 获取当前的地区语言
 */
export const getLocale = () => {
  return LOCALE.value;
};

export const useI18n = () => {
  const configProvider = inject(EurusConfigProviderKey, undefined);
  const i18nMessage = computed<typeof zhCN>(() => I18N_MESSAGES[configProvider?.locale ?? LOCALE.value]);
  const locale = computed<string>(() => i18nMessage.value.locale);

  const transform = (key: string, ...args: any[]) => {
    const keyArray = key.split('.');
    let temp: any = i18nMessage.value;

    for (const keyItem of keyArray) {
      if (!temp[keyItem]) {
        return key;
      }
      temp = temp[keyItem];
    }
    if (isString(temp)) {
      if (args.length > 0) {
        return temp.replaceAll(/{(\d+)}/g, (sub: string, index: number) => args[index] ?? sub);
      }

      return temp;
    }
    return temp;
  };

  return {
    locale,
    t: transform,
  };
};
