import { mount } from '@vue/test-utils';
import EFormItem from '..';

describe('eFormItem', () => {
	it('eFormItem snapshot', () => {
		const wrapper = mount(EFormItem);
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});
});
