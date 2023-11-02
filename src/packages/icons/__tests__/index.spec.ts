import { mount } from '@vue/test-utils';
import EIcon from '..';

describe('EIcon', () => {
	it('EIcon snapshot', () => {
		const wrapper = mount(EIcon, {
			props: {
				name: 'arrowDown',
				size: 40,
				color: 'red',
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it('should work with `size` prop', async () => {
		const wrapper = mount(EIcon, { props: { name: 'arrowDown', size: 40 } });
		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.find('.eu-icon').attributes('style')).toContain('font-size: 40px');
		wrapper.unmount();
	});

	it('should work with `color` prop', async () => {
		const wrapper = mount(EIcon, { props: { name: 'arrowDown', color: 'red' } });
		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.find('.eu-icon').attributes('style')).toContain('color: red');
		wrapper.unmount();
	});

	it('should work with use classname', async () => {
		const wrapper = mount(EIcon, { props: { name: 'iconfont icontest', color: 'red' } });
		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.find('i').classes()).toMatchInlineSnapshot(`
      [
        "iconfont",
        "icontest",
      ]
    `);
		wrapper.unmount();
	});
});
