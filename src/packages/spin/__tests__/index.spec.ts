import { mount } from '@vue/test-utils';
import ESpin from '..';

describe('spin', () => {
	it('spin snapshot', () => {
		const wrapper = mount(ESpin);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
