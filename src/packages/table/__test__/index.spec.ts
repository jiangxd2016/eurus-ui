import { mount } from '@vue/test-utils';
import ETable from '..';

describe('ETable', () => {

  it('ETable snapshot', () => {
    const wrapper = mount(ETable);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
