import { mount } from '@vue/test-utils';
import EDatePicker from '..';

describe('EDate-picker', () => {

  it('EDate-picker snapshot', () => {
    const wrapper = mount(EDatePicker);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
