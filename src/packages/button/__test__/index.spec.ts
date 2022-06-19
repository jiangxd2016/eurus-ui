import { shallowMount } from '@vue/test-utils'
import Button from '..'

describe('Button.vue', () => {
  test('render', () => {
    const wrapper = shallowMount(Button, {
      props: {},
    })
    expect(wrapper.classes()).toContain('e-button')
  })
})
