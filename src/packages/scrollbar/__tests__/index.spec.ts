import { mount } from '@vue/test-utils';
import EScrollbar from '..';

describe('scrollbar', () => {

  it('scrollbar snapshot', () => {
    const wrapper = mount(EScrollbar);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
