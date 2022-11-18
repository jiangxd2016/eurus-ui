import { mount } from '@vue/test-utils';
import EBackTop from '..';

describe('EBackTop', () => {

  it('EBackTop snapshot', () => {
    const wrapper = mount(EBackTop);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
