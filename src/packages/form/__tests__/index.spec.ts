import { mount } from '@vue/test-utils';
import EForm from '..';

describe('EForm', () => {
  it('EForm snapshot', () => {
    const wrapper = mount(EForm);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
