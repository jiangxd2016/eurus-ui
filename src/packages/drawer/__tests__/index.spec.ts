import { mount } from '@vue/test-utils';
import EDrawer from '..';

describe('eDrawer', () => {
	it('eDrawer snapshot', () => {
		const wrapper = mount(EDrawer);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
