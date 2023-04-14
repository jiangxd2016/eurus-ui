import { mount } from '@vue/test-utils';
import EPagination from '..';

describe('pagination', () => {

  it('pagination snapshot', () => {
    const wrapper = mount(EPagination);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
