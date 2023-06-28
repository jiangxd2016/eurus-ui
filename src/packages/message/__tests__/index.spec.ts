import { mount } from '@vue/test-utils';
import EMessage from '..';

describe('message', () => {
  it('message snapshot', () => {
    const wrapper = mount(EMessage);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
