import { mount } from '@vue/test-utils';
import EForm from '..';

describe('eForm', () => {
	it('eForm snapshot', () => {
		const wrapper = mount(EForm);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
