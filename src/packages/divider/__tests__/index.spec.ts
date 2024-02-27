import { mount } from '@vue/test-utils';
import EDivider from '..';

describe('eDivider', () => {
	it('eDivider snapshot', () => {
		const wrapper = mount(EDivider);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
