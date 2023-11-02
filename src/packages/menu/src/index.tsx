import type { PropType } from 'vue';
import { computed, defineComponent, onBeforeUnmount, onMounted, provide, reactive, ref } from 'vue';
import type { Item } from './interface';
import MenuList from './menuList';
import {
	MenuFlatChangeKeys,
	MenuFlatKeys,
	MenuPropsKeys,
	MenuSelectHoverKeys,
	MenuSelectedChangeKeys,
	MenuSelectedKeys,
	getPrefixCls,
} from '@/packages/_utils';
import './style.scss';

export const EMenuProps = {
	mode: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
	items: {
		type: Array as PropType<Array<Item>>,
		default: () => [],
	},
	trigger: {
		type: String as PropType<'click' | 'hover'>,
		default: 'click',
	},
	openkeys: {
		type: Array as PropType<Array<string>>,
		default: () => [],
	},
	theme: {
		type: String as PropType<'light' | 'dark'>,
		default: 'light',
	},
	selectedKey: {
		type: String,
		default: '',
	},
	collapsed: {
		type: Boolean,
		default: false,
	},
};

export default defineComponent({
	name: 'EMenu',
	props: EMenuProps,
	emits: ['update:openkeys', 'update:selectedKey', 'click', 'select'],
	setup(props, { emit }) {
		const prefixCls = getPrefixCls('menu');

		const computedCls = computed(() => {
			return {
				[prefixCls]: true,
				[`${prefixCls}-${props.mode}`]: true,
				[`${prefixCls}-${props.theme}`]: true,
				[`${prefixCls}-collapsed`]: props.collapsed && props.mode === 'vertical',
			};
		});

		provide(MenuPropsKeys, props);

		const flatList = ref<string[]>([]);

		const flatChange = (key: string, add: boolean) => {
			if (add) {
				flatList.value.push(key);
			} else {
				const index = flatList.value.indexOf(key);
				flatList.value.splice(index, 1);
			}
			emit('update:openkeys', flatList.value);
		};

		provide(MenuFlatKeys, flatList);
		provide(MenuFlatChangeKeys, reactive({ flatChange }));

		const selectKey = ref(props.selectedKey);
		const selectedChange = (key: string) => {
			selectKey.value = key;
			emit('update:selectedKey', key);
		};

		provide(MenuSelectedKeys, selectKey);
		provide(MenuSelectedChangeKeys, reactive({ selectedChange }));

		const itemHoverKey = ref('');
		provide(MenuSelectHoverKeys, itemHoverKey);

		// 收起全部
		const slideUp = () => {
			flatList.value = [];
			selectKey.value = '';
		};
		const handleClick = (item: Item) => {
			emit('click', item);
		};
		const handleSelect = (item: Item) => {
			emit('select', item);
		};
		onMounted(() => {
			if (props.trigger === 'click' && props.mode === 'horizontal') {
				document.addEventListener('click', slideUp, false);
			}
		});
		onBeforeUnmount(() => {
			if (props.trigger === 'click' && props.mode === 'horizontal') {
				document.removeEventListener('click', slideUp, false);
			}
		});

		return () => (
			<div class={computedCls.value}>
				<MenuList items={props.items} onClick={handleClick} onSelect={handleSelect}></MenuList>
			</div>
		);
	},
});
