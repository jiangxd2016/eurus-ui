import { mount } from '@vue/test-utils';
import ENotify from '..';

describe('notify', () => {

 it('notify snapshot', () => {
    const wrapper = mount(ENotify);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
