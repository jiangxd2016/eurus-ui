import { mount } from '@vue/test-utils';
import ECarousel from '..';

describe('carousel', () => {
  it('carousel snapshot', () => {
    const wrapper = mount(ECarousel);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
