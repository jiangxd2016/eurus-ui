import { mount } from '@vue/test-utils';
import ETree from '..';

describe('ETree', () => {

  it('ETree snapshot', () => {
    const wrapper = mount(ETree);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
