import { mount } from '@vue/test-utils';
import ETrigger from '..';

describe('trigger', () => {
	it('trigger snapshot', () => {
		const wrapper = mount(ETrigger);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
