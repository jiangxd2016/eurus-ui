import { mount } from '@vue/test-utils';
import { ETable } from '..';

describe('table', () => {
  it('table snapshot', () => {
    const wrapper = mount(ETable);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
