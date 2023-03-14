import { mount } from '@vue/test-utils';
import EDialog from '..';

describe('dialog', () => {

  it('dialog snapshot', () => {
    const wrapper = mount(EDialog);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

});
