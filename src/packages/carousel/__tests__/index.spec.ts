import { mount } from '@vue/test-utils';
import ECarousel from '..';

describe('ECarousel', () => {

  it('ECarousel snapshot', () => {
    const wrapper = mount(ECarousel);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
