import { mount } from '@vue/test-utils';
import ESpace from '..';

describe('space', () => {

  it('space snapshot', () => {
    const wrapper = mount(ESpace);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
