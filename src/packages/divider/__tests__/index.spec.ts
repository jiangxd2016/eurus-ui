import { mount } from '@vue/test-utils';
import EDivider from '..';

describe('EDivider', () => {
  it('EDivider snapshot', () => {
    const wrapper = mount(EDivider);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
