import {mount} from '@vue/test-utils';
import ETag from '..';
import {expect} from "vitest";

describe('ETag', () => {

  it('ETag snapshot', () => {
    const wrapper = mount(ETag);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should work with props', () => {
    const wrapper = mount(ETag, {
      props: {
        size: 'md',
        type: 'primary',
        color: 'red',
        borderColor: 'blue',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();

  });

  it('should work with `closable` prop', async () => {

    const wrapper = mount(ETag, {
      props: {
        closable: true,
      }
    });

    await wrapper.find('.eu-tag-icon').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.find('.eu-tag').attributes("style")).toBe("display: none;");
    wrapper.unmount();
  });
});
