import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import EInputNumber from '..';

describe('EInputNumber', () => {
	it('EInputNumber snapshot', () => {
		const wrapper = mount(EInputNumber);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
	it('should work with disabled props', () => {
		const wrapper = mount(EInputNumber, {
			props: {
				disabled: true,
			},
		});
		expect(wrapper.find('.eu-input-number').classes()).toMatchInlineSnapshot(`
      [
        "eu-input-number",
        "eu-input-number--disabled",
      ]
    `);
		wrapper.unmount();
	});
	it('should work with max props', async () => {
		const value = ref(10);
		const wrapper = mount(EInputNumber, {
			props: {
				modelValue: value.value,
				max: 10,
			},
		});

		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');

		await wrapper.find('.eu-input-number-plus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');
		wrapper.unmount();
	});

	it('should work with min props', async () => {
		const value = ref(10);
		const wrapper = mount(EInputNumber, {
			props: {
				modelValue: value.value,
				min: 10,
			},
		});

		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');
		await wrapper.find('.eu-input-number-minus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');
		wrapper.unmount();
	});

	it('should work with step props', async () => {
		const value = ref(10);
		const wrapper = mount(EInputNumber, {
			props: {
				modelValue: value.value,
				step: 2,
			},
		});

		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');
		await wrapper.find('.eu-input-number-minus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('8');

		await wrapper.find('.eu-input-number-plus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('10');
		wrapper.unmount();
	});

	it('should work with precision props', async () => {
		const value = ref(1.11);
		const wrapper = mount(EInputNumber, {
			props: {
				modelValue: value.value,
				step: 0.23,
				precision: 2,
			},
		});

		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('1.11');
		await wrapper.find('.eu-input-number-minus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('0.88');

		await wrapper.find('.eu-input-number-minus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('0.65');

		await wrapper.find('.eu-input-number-plus').trigger('click');
		await nextTick();
		expect(wrapper.find('input').element.value).toMatchInlineSnapshot('0.88');
		wrapper.unmount();
	});
});
