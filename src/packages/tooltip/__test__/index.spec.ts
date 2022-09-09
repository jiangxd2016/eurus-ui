import { mount } from '@vue/test-utils';
import ETooltip from '..';

describe('ETooltip', () => {

  it('ETooltip snapshot', () => {
    const wrapper = mount(ETooltip);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
