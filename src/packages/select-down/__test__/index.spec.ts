import { mount } from '@vue/test-utils';
import ESelectDown from '..';

describe('ESelectDown', () => {

 it('ESelectDown snapshot', () => {
    const wrapper = mount(ESelectDown);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
