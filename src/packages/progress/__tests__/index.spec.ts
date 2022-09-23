import { mount } from '@vue/test-utils';
import EProgress from '..';

describe('EProgress', () => {

  it('EProgress snapshot', () => {
    const wrapper = mount(EProgress);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
