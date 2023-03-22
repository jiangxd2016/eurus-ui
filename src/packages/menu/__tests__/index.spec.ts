import { mount } from '@vue/test-utils';
import EMenu from '..';

describe('menu', () => {

 it('menu snapshot', () => {
    const wrapper = mount(EMenu);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
