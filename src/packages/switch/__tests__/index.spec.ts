import { mount } from '@vue/test-utils';
import ESwitch from '..';

describe('ESwitch', () => {
	it('ESwitch snapshot', () => {
		const wrapper = mount(ESwitch);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	it('should emit change event', async () => {
		const fn = vi.fn();
		const wrapper = mount(ESwitch, {
			props: {
				modelValue: '1',
				onChange: fn,
			},
		});

		await wrapper.find('input').trigger('change');
		expect(wrapper.html()).toMatchSnapshot();
		expect(fn).toHaveBeenCalled();
	});
	it('should work with `disabled` props', async () => {
		const fn = vi.fn();
		const wrapper = mount(ESwitch, {
			props: {
				modelValue: '1',
				disabled: true,
				onChange: fn,
			},
		});

		await wrapper.find('input').trigger('change');
		expect(wrapper.html()).toMatchSnapshot();
		expect(fn).not.toHaveBeenCalled();
	});
	it('should work with `checkedValue uncheckedValue checkedLabel uncheckedLabel` props', async () => {
		const wrapper = mount(ESwitch, {
			props: {
				modelValue: '1',
				checkedValue: '1',
				uncheckedValue: '0',
				checkedLabel: '开',
				uncheckedLabel: '关',
			},
		});
		expect(wrapper.find('.eu-switch__label-left').text()).toBe('关');
		await wrapper.find('input').trigger('change');

		expect(wrapper.find('.eu-switch__label-right').text()).toBe('开');
	});

	it('should work with `checkedColor uncheckedColor` props', async () => {
		const wrapper = mount(ESwitch, {
			props: {
				checkedColor: '#13ce66',
				uncheckedColor: '#ff4949',
			},
		});
		expect(wrapper.find('.eu-switch__inner').attributes('style')).toMatchInlineSnapshot(
			'"background-color: #ff4949;"',
		);
		await wrapper.find('input').trigger('change');
		expect(wrapper.find('.eu-switch__inner').attributes('style')).toMatchInlineSnapshot(
			'"background-color: #13ce66;"',
		);
	});
});
