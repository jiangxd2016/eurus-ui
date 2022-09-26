import { mount } from '@vue/test-utils';
import ENotification from '..';

describe('ENotification', () => {

  it('ENotification snapshot', () => {
    const wrapper = mount(ENotification);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
