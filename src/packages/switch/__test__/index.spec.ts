import { mount } from '@vue/test-utils';
import ESwitch from '..';

describe('ESwitch', () => {

  it('ESwitch snapshot', () => {
    const wrapper = mount(ESwitch);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
