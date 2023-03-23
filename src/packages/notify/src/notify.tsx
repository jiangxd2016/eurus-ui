import type { PropType } from 'vue';
import { computed, defineComponent, onMounted, onUpdated, onUnmounted } from 'vue';
import type { MessageType } from '@/packages/_utils';
import { toKebabCase, getPrefixCls } from '@/packages/_utils';
import EIcons from '@/packages/icons';
import EButton from '@/packages/button';
export default defineComponent({
  name: 'Notify',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    resetOnUpdate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const prefixCls = getPrefixCls('notify');

    const computedCls = computed(() => {
      return [
        prefixCls,
				`${prefixCls}-${props.type}`,
				{ [`${prefixCls}-closable`]: props.closable },
      ];
    });

    let timer = 0;
    const iconName = toKebabCase(props.type);

    const handleClose = () => {
      emit('close');
    };

    onMounted(() => {
      if (props.duration > 0) {
        timer = window.setTimeout(handleClose, props.duration);
      }
    });

    onUpdated(() => {
      if (props.resetOnUpdate) {
        if (timer) {
          window.clearTimeout(timer);
          timer = 0;
        }
        if (props.duration > 0) {
          timer = window.setTimeout(handleClose, props.duration);
        }
      }
    });

    onUnmounted(() => {
      if (timer) {
        window.clearTimeout(timer);
      }
    });
    return () => (
			<li
				role="alert"
				class={computedCls.value}
			>
				<div class={`${prefixCls}-left`}>
					{props.showIcon && (
						<EIcons name={iconName} class={`${prefixCls}-icon ${prefixCls}-icon-${props.type}`} size="sm"></EIcons>
					)}
				</div>
				<div class={`${prefixCls}-right`}>
					<div class={`${prefixCls}-title`}>
						{slots?.default?.()}
					</div>
					<div class={`${prefixCls}-content`}>
						{slots?.content?.()}
					</div>
					{slots?.footer && <div class={`${prefixCls}-footer`}>
						{slots.footer()}
					</div>}

				</div>
				{props.closable && (
					<EButton
					round
					type="text"
					class={`${prefixCls}-close`}
					onClick={handleClose}
					v-slots={{ default: () => <EIcons name="close" color="#aaa"/> }}
					>
					</EButton>

				)}
			</li>
    );
  }
});
