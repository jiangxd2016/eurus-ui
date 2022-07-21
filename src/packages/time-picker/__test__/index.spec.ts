import { mount } from '@vue/test-utils';
import ETimePicker from '..';

describe('ETimePicker', () => {

  it('ETimePicker snapshot', () => {
    const wrapper = mount(ETimePicker);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
