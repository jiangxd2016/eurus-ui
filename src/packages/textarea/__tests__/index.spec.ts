import { mount } from '@vue/test-utils';
import ETextarea from '..';

describe('ETextarea', () => {

  it('ETextarea snapshot', () => {
    const wrapper = mount(ETextarea);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
