import { mount } from '@vue/test-utils';
import ESelect from '..';

describe('ESelect', () => {

 it('ESelect snapshot', () => {
    const wrapper = mount(ESelect);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
