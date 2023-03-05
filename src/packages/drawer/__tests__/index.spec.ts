import { mount } from '@vue/test-utils';
import EDrawer from '..';

describe('EDrawer', () => {

 it('EDrawer snapshot', () => {
    const wrapper = mount(EDrawer);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
