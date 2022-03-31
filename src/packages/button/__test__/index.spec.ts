import { mount } from '@vue/test-utils'
import Button from '../index'

describe('Button.vue', () => {
  test('render', () => {
    const wrapper = mount(Button, {
      props: {},
    })
    expect(wrapper.classes()).toContain('button')
  })
})
