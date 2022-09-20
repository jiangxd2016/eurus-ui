import { mount } from '@vue/test-utils';
import EInput from '..';

describe('EInput', () => {

  it('EInput snapshot', () => {
    const wrapper = mount(EInput);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
