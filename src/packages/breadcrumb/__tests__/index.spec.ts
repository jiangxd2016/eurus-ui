import { mount } from '@vue/test-utils';
import EBreadcrumb from '..';

describe('eBreadcrumb', () => {
	it('eBreadcrumb snapshot', () => {
		const wrapper = mount(EBreadcrumb);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
