import { mount } from '@vue/test-utils';
import EInputNumber from '..';

describe('EInputNumber', () => {

  it('EInputNumber snapshot', () => {
    const wrapper = mount(EInputNumber);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
