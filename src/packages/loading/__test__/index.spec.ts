import { mount } from '@vue/test-utils';
import ELoading from '..';

describe('ELoading', () => {

  it('ELoading snapshot', () => {
    const wrapper = mount(ELoading);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should Teleport to work', ()=>{

    const wrapper = mount(ELoading, {
      to: 'body'
    });
    wrapper.unmount();
  });
});
