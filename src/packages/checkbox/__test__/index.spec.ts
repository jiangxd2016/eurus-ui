import { mount } from '@vue/test-utils';
import ECheckbox from '..';

describe('ECheckbox', () => {

  it('ECheckbox snapshot', () => {
    const wrapper = mount(ECheckbox);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
