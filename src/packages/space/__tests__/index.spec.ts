import { mount } from '@vue/test-utils';
import ESpace from '..';

describe('ESpace', () => {

 it('ESpace snapshot', () => {
    const wrapper = mount(ESpace);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
