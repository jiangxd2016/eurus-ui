import { mount } from '@vue/test-utils';
import EDatePicker from '..';

describe('EDatePicker', () => {

  it('EDatePicker snapshot', () => {
    const wrapper = mount(EDatePicker);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
