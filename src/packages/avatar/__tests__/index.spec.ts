import { mount } from '@vue/test-utils';
import EAvatar from '..';

describe('EAvatar', () => {

  it('EAvatar snapshot', () => {
    const wrapper = mount(EAvatar);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
