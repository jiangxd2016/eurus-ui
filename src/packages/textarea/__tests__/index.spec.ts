import { mount } from '@vue/test-utils';
import ETextarea from '..';

describe('eTextarea', () => {
	it('eTextarea snapshot', () => {
		const wrapper = mount(ETextarea);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
