import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, ref, Teleport, toRefs, Transition } from 'vue';
import './style.scss';
import { useI18n } from '@/packages/locale';
import { getPrefixCls, isNumber } from '@/packages/_utils';
import Icons from '@/packages/icons';
import EButton from '@/packages/button';
import usePopupManager from '@/packages/_hooks/usePopupMangaer';
import { useDraggable } from '@/packages/_hooks/useDraggable';

const EDialogProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [Number, String],
  },
  top: {
    type: [Number, String],
  },
  confirmText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },

  beforeConfirm: {
    type: Function as PropType<() => void>,
    default: () => {
    }
  },
  beforeCancel: {
    type: Function as PropType<() => void>,
    default: () => {
    }
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  popupContainer: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
};

export default defineComponent({
  name: 'EDialog',
  props: EDialogProps,
  setup(props, { slots, emit }) {
    const { visible, title, draggable } = toRefs(props);

    const { t } = useI18n();
    const prefixCls = getPrefixCls('dialog');
    const { zIndex } = usePopupManager('message', { runOnMounted: true, visible, });

    const wrapperRef = ref<HTMLElement>();
    const modalRef = ref<HTMLElement>();

    const { position, handleMoveDown } = useDraggable({
      wrapperRef,
      modalRef,
      draggable,
    });

    const confirmText = computed(() => {
      return props.confirmText || t('popConfirm.okText');
    });
    const cancelText = computed(() => {
      return props.cancelText || t('popConfirm.cancelText');
    });

    const wrapperCls = computed(() => {
      return {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-draggable`]: draggable.value,
        [`${prefixCls}-wrapper-moved`]: position.value,
      };
    });

    const mergedContentStyle = computed(() => {
      const style: CSSProperties = {};
      if (props.width) {
        style.width = isNumber(props.width) ? `${props.width}px` : props.width;
      }
      if (props.top) {
        style.top = isNumber(props.top) ? `${props.top}px` : props.top;
      }
      if (position.value) {
        style.transform = `translate(${position.value[0]}px, ${position.value[1]}px)`;
      }

      return style;
    });

    const handleClose = () => {
      emit('close', false);
    };

    const handelConfirm = () => {
      props.beforeConfirm();
      handleClose();
    };

    const handelCancel = () => {
      props.beforeCancel();
      handleClose();
    };

    return () => (
      <Teleport to={props.popupContainer}>
        <Transition name="EuDialog">
          {
            props.visible && <div class={`${prefixCls}-container`} style={{ zIndex: zIndex.value }}>
              <div class={`${prefixCls}-mask`} role="button" tabindex={-1} onClick={handleClose}/>
              <div class={wrapperCls.value} ref={wrapperRef}>
                <div class={prefixCls} ref={modalRef} style={mergedContentStyle.value}>
                  <div class={`${prefixCls}-header`} role="button" tabindex="0" onMousedown={handleMoveDown}>
                    <div class="title">
                      {title.value}
                    </div>
                    <div class="close">
                      <Icons name="close" class="icon-close" size="26" onClick={handleClose}/>
                    </div>

                  </div>
                  <div class={`${prefixCls}-body`}>
                    {slots.default && slots.default()}
                  </div>
                  <div class={`${prefixCls}-footer`}>
                    <EButton type="primary" class="confirm" onClick={handelConfirm}>{
                      confirmText.value
                    }</EButton>
                    <EButton onClick={handelCancel}>{
                      cancelText.value
                    }</EButton>
                  </div>
                </div>
              </div>
            </div>
          }
        </Transition>
      </Teleport>
    );
  },
});
