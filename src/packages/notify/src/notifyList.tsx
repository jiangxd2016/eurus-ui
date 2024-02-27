import { TransitionGroup, defineComponent } from 'vue';
import { getPrefixCls, getSlotFunction, toKebabCase } from '@/packages/_utils';
import usePopupManager from '@/packages/_hooks/usePopupManager';
import { NOTIFICATION_POSITION } from './interface';
import Notify from './notify';
import type { NotifyItem, NotifyPosition } from './interface';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'NotifyList',
	props: {
		notifications: {
			type: Array as PropType<NotifyItem[]>,
			default: () => [],
		},
		position: {
			type: String as PropType<NotifyPosition>,
			default: 'topRight',
			validator: (value: any) => {
				return NOTIFICATION_POSITION.includes(value);
			},
		},
	},
	emits: ['close', 'afterClose'],
	setup(props, context) {
		const prefixCls = getPrefixCls('notify-list');
		const kebabPosition = toKebabCase(props.position);
		const { zIndex } = usePopupManager('message', { runOnMounted: true });

		const isRight = props.position.includes('Right');

		return () => (
			<div class={`${prefixCls} ${prefixCls}-${kebabPosition}`} style={{ zIndex: zIndex.value }}>
				<TransitionGroup
					name={`slide-${isRight ? 'right' : 'left'}-notify`}
					onAfterLeave={() => context.emit('afterClose')}
					tag="ul"
				>
					{props.notifications.map(item => {
						const slots = {
							default: getSlotFunction(item.title),
							content: getSlotFunction(item.content),
							icon: getSlotFunction(item.icon),
							footer: getSlotFunction(item.footer),
						};
						return (
							<Notify
								key={item.id}
								type={item.type}
								duration={item.duration}
								closable={item.closable}
								v-slots={slots}
								onClose={() => context.emit('close', item.id)}
							/>
						);
					})}
				</TransitionGroup>
			</div>
		);
	},
});
