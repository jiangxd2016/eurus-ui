import { mount } from '@vue/test-utils';
import ETag from '..';

describe('ETag', () => {

  it('ETag snapshot', () => {
    const wrapper = mount(ETag);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
