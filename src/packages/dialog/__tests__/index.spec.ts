import { mount } from '@vue/test-utils';
import EDialog from '..';

describe('EDialog', () => {

  it('EDialog snapshot', () => {
    const wrapper = mount(EDialog);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
