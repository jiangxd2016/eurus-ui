import { mount } from '@vue/test-utils';
import EIcon from '..';

describe('EIcon', () => {

  it('EIcon snapshot', () => {
    const wrapper = mount(EIcon);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
