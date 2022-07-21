import type { SetupContext, PropType } from 'vue';
import { defineComponent, Transition } from 'vue';
import './style.scss';
import EButton from '../../button';
import classNames from '@/composables/useClassName';

const ModalProps = {
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  size: {
    type: String as PropType<string>,
    default: 'md'
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
  name: 'EDialog',
  props: ModalProps,
  setup (props, { slots, emit }: SetupContext) {
    const modalClass = () => {
      return classNames(['e-dialog', `${props.size}`]);
    };

    const closeModal = () => {
      emit('close', false);
    };

    const confirm = () => {
      props.confirm();
      closeModal();
    };

    const cancel = () => {
      props.cancel();
      closeModal();
    };

    return () => (
      <Transition name="EDialog">
        {props.show
          ? <div class="e-dialog-wrapper">
          <div class="e-dialog-backdrop" role="button" tabindex={-1} onClick={closeModal} />
          <div class={modalClass()}>
            <div class="e-dialog-content">
              <div class="e-dialog-header">
                <div class="title">
                  {props.title}
                </div>
                <div class="close">
                  <span class="icon-close" onClick={closeModal} />
                </div>
              </div>
              {slots.default && slots.default()}
              <div class="e-dialog-footer">
                <EButton type="primary" class="confirm" onClick={confirm}>确认</EButton>
                <EButton onClick={cancel}>取消</EButton>
              </div>
            </div>
          </div>
        </div >
          : null}
      </Transition>
    );
  }
});
