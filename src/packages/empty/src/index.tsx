import { defineComponent } from 'vue';
import './style.scss';
import Icons from '@/packages/icons';
import { getPrefixCls } from '@/packages/_utils';
import { useI18n } from '@/packages/locale';

const EEmptyProps = {
  description: String,
  imgSrc: String,
};

export default defineComponent({
  name: 'EEmpty',
  props: EEmptyProps,
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('empty');
    const { t } = useI18n();

    return () => (
      <div class={prefixCls}>
        <div class={`${prefixCls}-image`}>
          {slots.image?.() ?? (props.imgSrc ? <img src={props.imgSrc} alt={props.description || 'empty'} /> : <Icons name="empty" />)}
        </div>
        <div class={`${prefixCls}-description`}>{slots.default?.() ?? (props.description || t('empty.description'))}</div>
      </div>
    );
  },
});
