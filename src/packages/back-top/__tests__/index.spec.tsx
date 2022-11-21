import { mount } from '@vue/test-utils';
import type { VNode } from 'vue';
import { nextTick } from 'vue';
import EBackTop from '..';

const _mount = (render: () => VNode) =>
  mount(render, { attachTo: document.body });

describe('EBackTop', () => {

  it('should work with props', async () => {

    const wrapper = _mount(() => (
      <div class="target" style="height: 100px; overflow: auto">
        <div style="height: 10000px; width: 100%">
          <EBackTop
            to=".target"
            height={2000}
            right={100}
            bottom={200}
          />
        </div>
      </div>
    ));
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();

    // scroll to 2000px
    wrapper.element.scrollTop = 1000;
    await wrapper.trigger('scroll');
    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.find('.eu-back-top').attributes('style')).toMatchInlineSnapshot(
      '"right: 100px; bottom: 200px; visibility: hidden;"'
    );

    // scroll to 3000px
    wrapper.element.scrollTop = 3000;
    await wrapper.trigger('scroll');
    expect(wrapper.html()).toMatchSnapshot();

    expect(wrapper.find('.eu-back-top').attributes('style')).toMatchInlineSnapshot(
      '"right: 100px; bottom: 200px; visibility: visible;"'
    );

    await wrapper.trigger('click');
    expect(wrapper.emitted()).toBeDefined();
    wrapper.unmount();
  });
});
