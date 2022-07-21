import { mount } from '@vue/test-utils';
import ERadio from '..';

describe('ERadio', () => {

  it('ERadio snapshot', () => {
    const wrapper = mount(ERadio);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
