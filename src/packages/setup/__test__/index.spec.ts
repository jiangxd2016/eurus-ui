import { mount } from '@vue/test-utils';
import ESetup from '..';

describe('ESetup', () => {

  it('ESetup snapshot', () => {
    const wrapper = mount(ESetup);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
