import { mount } from '@vue/test-utils';
import EBreadcrumb from '..';

describe('EBreadcrumb', () => {
	it('EBreadcrumb snapshot', () => {
		const wrapper = mount(EBreadcrumb);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
