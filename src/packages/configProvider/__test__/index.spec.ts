import { mount } from '@vue/test-utils';
import EConfigProvider from '..';

describe('EConfigProvider', () => {

  it('EConfigProvider snapshot', () => {
    const wrapper = mount(EConfigProvider);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
