import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { EButton } from '../../button';
import EButtonGroup from '..';

describe('eButtonGroup', () => {
	it('eButtonGroup snapshot', () => {
		const wrapper = mount(EButtonGroup);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it('should work with button group', async () => {
		const wrapper = mount(EButtonGroup, {
			slots: {
				default: () => [
					h(EButton, { type: 'primary' }, { default: () => 'button1' }),
					h(EButton, { type: 'primary' }, { default: () => 'button2' }),
					h(EButton, { type: 'primary' }, { default: () => 'button3' }),
				],
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.findAll('button').length).toBe(3);
		await wrapper.setProps({ vertical: true });

		expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "eu-button-group",
        "vertical",
      ]
    `);
		wrapper.unmount();
	});
});
