import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import ESelect from '..';
import EOption from '../src/option';
import SelectDown from '@/packages/select-down';
import {expect} from "vitest";

const slots = {
  default: [
    <EOption value="1" label="基础用法1"/>,
    <EOption value="2" label="基础用法2"/>,
    <EOption value="3" label="基础用法3"/>,
  ]
};

describe('ESelect', () => {

  const modelValue = ref('1');

  it('should work with `modelValue` props', async () => {
    const wrapper = mount(ESelect, {
      props: {
        modelValue,
      },
      slots,
    });
    await nextTick();
    expect(wrapper.findComponent(SelectDown).find('.eu-select-down-control-single').text()).toMatchInlineSnapshot('"基础用法1"');
    expect(wrapper.findComponent(SelectDown).find('.eu-select-option-selected').text()).toMatchInlineSnapshot('"基础用法1"');

    modelValue.value = '2';
    await nextTick();
    expect(wrapper.findComponent(SelectDown).find('.eu-select-down-control-single').text()).toMatchInlineSnapshot('"基础用法2"');
    expect(wrapper.findComponent(SelectDown).find('.eu-select-option-selected').text()).toMatchInlineSnapshot('"基础用法2"');
  });

  it('should work with ', function () {

  });
});
