import { mount } from '@vue/test-utils';
import ETooltip from '..';

describe('ETooltip', () => {

  it('ETooltip snapshot', () => {
    const wrapper = mount(ETooltip, {
      props: {
        content: 'fXXK '
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
