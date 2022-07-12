import { mount } from '@vue/test-utils';
import EMessage from '..';

describe('EMessage', () => {

  it('EMessage snapshot', () => {
    const wrapper = mount(EMessage);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
