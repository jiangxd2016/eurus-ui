import { getPrefixCls } from '@/packages/_utils/global-config';
import { defineComponent, PropType, Transition } from 'vue';
import './style.scss';
import Icon from '@/packages/icons';
import EButton from '@/packages/button';

const EDrawerProps = {
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  footer: {
    type: Boolean,
    default: false,
  },
  confirm: {
    type: Function as PropType<() => void>,
    default: () => { }
  },
  cancel: {
    type: Function as PropType<() => void>,
    default: () => { }
  }
};

export default defineComponent({
  name: 'EDrawer',
  props: EDrawerProps,
  emits: ["close"],
  setup(props, { slots, emit }) {

    const prefixCls = getPrefixCls('drawer');
    const closeDrawer = () => {
      emit('close', false);
    };

    const thisConfirm = () => {
      props.confirm();
      closeDrawer();
    };

    const thisCancel = () => {
      props.cancel();
      closeDrawer();
    };


    return () => (
      <Transition name="EuDrawer">
        {props.show
          ? <div class={`${prefixCls}-container`}>
            <div class="eu-drawer-mask " role="button" tabindex={-1} onClick={closeDrawer}>
            </div>
            <div class={prefixCls}>
              <div class="eu-drawer-header">
                <div class="title">
                  {props.title}
                </div>
                <Icon name="close" size="22"></Icon>

              </div>
              <div class={`${prefixCls}-body`}>
                {slots.default && slots.default()}
              </div>

              {props.footer && <div class="eu-drawer-footer">
                <EButton
                  type="primary"
                  onClick={thisConfirm}
                >
                  确认
                </EButton>
                <EButton onClick={thisCancel}>
                  取消
                </EButton>
              </div>}
            </div>
          </div>
          : null}

      </Transition>

    );
  },
});
