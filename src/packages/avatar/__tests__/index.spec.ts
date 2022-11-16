import { mount } from '@vue/test-utils';
import EAvatar from '..';

describe('EAvatar', () => {

  it('EAvatar snapshot', () => {
    const wrapper = mount(EAvatar);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should work with `props`', () => {

    const wrapper = mount(EAvatar, {
      props: {
        size: 'md',
      },
      slots: {
        default: 'EAvatar',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();

  });
});
