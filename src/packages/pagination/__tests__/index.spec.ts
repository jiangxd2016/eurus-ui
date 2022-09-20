import { mount } from '@vue/test-utils';
import EPagination from '..';

describe('EPagination', () => {

  it('EPagination snapshot', () => {
    const wrapper = mount(EPagination);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
