import { mount } from '@vue/test-utils';
import EFormItem from '..';

describe('EFormItem', () => {

  it('EFormItem snapshot', () => {
    const wrapper = mount(EFormItem);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
