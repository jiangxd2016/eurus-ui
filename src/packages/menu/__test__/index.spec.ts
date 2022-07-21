import { mount } from '@vue/test-utils';
import EMenu from '..';

describe('EMenu', () => {

  it('EMenu snapshot', () => {
    const wrapper = mount(EMenu);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
