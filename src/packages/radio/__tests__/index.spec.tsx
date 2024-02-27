import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { h } from 'vue';
import ERadio, { ERadioGroup } from '..';

describe('eRadio', () => {
	it('should emit change event', async () => {
		const fn = vi.fn();
		const wrapper = mount(ERadio, {
			props: {
				modelValue: '1',
				value: '1',
				label: '1',
				onChange: fn,
			},
		});

		await wrapper.find('input').trigger('change');
		expect(wrapper.html()).toMatchSnapshot();
		expect(fn).toHaveBeenCalled();
	});
	it('should work with disabled props', async () => {
		const fn = vi.fn();
		const wrapper = mount(ERadio, {
			props: {
				modelValue: '1',
				value: '1',
				label: '1',
				disabled: true,
				onChange: fn,
			},
		});
		const groupWrapper = mount(ERadioGroup, {
			props: {
				modelValue: '1',
				disabled: true,
				onChange: fn,
			},
			slots: {
				default: () => h(ERadio, { label: '1', value: '1' }),
			},
		});
		await wrapper.trigger('click');
		await groupWrapper.findComponent(ERadio).trigger('click');
		expect(wrapper.html()).toMatchSnapshot();
		expect(groupWrapper.html()).toMatchSnapshot();
		expect(fn).not.toHaveBeenCalled();
	});
});
