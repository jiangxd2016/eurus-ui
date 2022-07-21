import type { PropType, SetupContext } from 'vue';
import { defineComponent, Transition } from 'vue';
import './style.scss';
import EButton from '../../button';

const DrawerProps = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  title: {
    type: String as PropType<string>,
    default: 'md'
  },
  confirm: {
    type: Function as PropType<() => void>,
    default: () => {}
  },
  cancel: {
    type: Function as PropType<() => void>,
    default: () => {}
  }
};

export default defineComponent({
  name: 'EDrawer',
  props: DrawerProps,
  setup (props, { slots, emit }: SetupContext) {
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
      <Transition name="EDrawer">
        {props.show
          ? <div class="e-drawer-wrapper">
          <div class="e-drawer-backdrop" role="button" tabindex={-1} onClick={closeDrawer}>
          </div>
          <div class="e-drawer">
            <div class="e-drawer-header">
              <div class="title">
                {props.title}
              </div>
              <div class="close">
                <span
                  class="icon-close"
                  onClick={closeDrawer}
                />
              </div>
            </div>
            {slots.default && slots.default()}
            <div class="e-drawer-footer">
              <EButton
                type="primary"
                onClick={thisConfirm}
              >
                确认
          </EButton>
              <EButton onClick={thisCancel}>
                取消
          </EButton>
            </div>
          </div>
        </div>
          : null}

      </Transition>
    );
  }
});

