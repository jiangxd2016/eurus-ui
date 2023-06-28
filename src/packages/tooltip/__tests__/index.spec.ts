import { mount } from '@vue/test-utils';
import ETooltip from '..';

describe('tool-tip', () => {
  it('tool-tip snapshot', () => {
    const wrapper = mount(ETooltip);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
