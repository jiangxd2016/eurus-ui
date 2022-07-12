import { mount } from '@vue/test-utils';
import ERate from '..';

describe('ERate', () => {

  it('ERate snapshot', () => {
    const wrapper = mount(ERate);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
