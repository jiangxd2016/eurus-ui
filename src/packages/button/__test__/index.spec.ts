import { mount } from '@vue/test-utils'
import Button from '..'

describe('Button.vue', () => {
  test('render', () => {
    const wrapper = mount(Button, {
      props: {},
    })
    expect(wrapper.classes()).toContain('button')
  })
})
