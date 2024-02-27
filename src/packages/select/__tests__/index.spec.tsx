import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { expect } from 'vitest';
import SelectDown from '@/packages/select-down';
import Tag from '@/packages/tag';
import ESelect from '..';
import EOption from '../src/option';

const slots = {
	default: [
		<EOption value="1" label="基础用法1" />,
		<EOption value="2" label="基础用法2" />,
		<EOption value="3" label="基础用法3" />,
	],
};

describe('eSelect', () => {
	it('should work with `modelValue` props', async () => {
		const modelValue = ref('1');
		const wrapper = mount(ESelect, {
			props: {
				modelValue,
			},
			slots,
		});
		await nextTick();
		expect(
			wrapper.findComponent(SelectDown).find('.eu-select-down-single').text(),
		).toMatchInlineSnapshot('"基础用法1"');
		expect(
			wrapper.findComponent(SelectDown).find('.eu-select-option-selected').text(),
		).toMatchInlineSnapshot('"基础用法1"');

		modelValue.value = '2';
		await nextTick();
		expect(
			wrapper.findComponent(SelectDown).find('.eu-select-down-single').text(),
		).toMatchInlineSnapshot('"基础用法2"');
		expect(
			wrapper.findComponent(SelectDown).find('.eu-select-option-selected').text(),
		).toMatchInlineSnapshot('"基础用法2"');
		wrapper.unmount();
	});

	it('should work with `clear` props', async () => {
		const modelValue = ref('1');
		const wrapper = mount(ESelect, {
			props: {
				modelValue,
				clear: true,
			},
			slots,
		});
		await nextTick();

		const selectDown = wrapper.findComponent(SelectDown);
		expect(selectDown.find('.clear-icon').exists()).toBeTruthy();
		selectDown.find('.clear-icon').trigger('click');
		expect(wrapper.emitted('clear')).toBeTruthy();
		expect(modelValue.value).toBe('');

		wrapper.unmount();
	});

	it('should work with `multiple,options` props', async () => {
		const vals = ref(['1', '2']);

		const options = [
			{
				value: '1',
				label: '基础用法1',
			},
			{
				value: '2',
				label: '基础用法2',
			},
			{
				value: '3',
				label: '基础用法3',
			},
			{
				value: '4',
				label: '基础用法4',
				disabled: true,
			},
			{
				value: '5',
				label: '基础用法5',
			},
		];

		const wrapper = mount(ESelect, {
			props: {
				modelValue: vals,
				options,
				multiple: true,
			},
		});
		await nextTick();
		expect(wrapper.findComponent(SelectDown).findAllComponents(Tag).length).toBe(2);
		expect(wrapper.findComponent(SelectDown).findAll('.eu-select-option').length).toBe(5);
		expect(wrapper.findComponent(SelectDown).findAll('.eu-select-option-disabled').length).toBe(1);
		expect(wrapper.findComponent(SelectDown).findAll('.eu-select-option-selected').length).toBe(2);

		wrapper.unmount();
	});
});
