import { mount } from '@vue/test-utils';
import { LoadingIcon } from '..';

describe('icon', () => {

  it('icon snapshot', ()=>{
    const wrapper = mount(LoadingIcon);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
