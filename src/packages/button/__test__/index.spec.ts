import { mount } from '@vue/test-utils'
import Button from '..'

describe('button', () => {

  test('button snapshot', () => {
    const wrapper = mount(Button)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
  test('button props type', () => {

    const propsType = ['default',
      'text',
      'primary',
      'info',
      'success',
      'warning',
      'error',
      'purple']

    propsType.forEach((type) => {
      const wrapper = mount(Button, {
        props: {
          type
        }
      })
      expect(wrapper.classes()).toContain('e-button--' + type)
      wrapper.unmount()

    })
  })

  test('button type', () => {
    const wrapper = mount(Button, {
      props: {}
    })

    expect(wrapper.classes()).toContain('e-button')
    wrapper.unmount()
  })
  test('button size', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('e-button--small')
  })

  test('button disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('e-button--disabled')
  }
  )
  test('button loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })

    expect(wrapper.classes()).toContain('e-button--loading')
  }
  )
  test('button icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'el-icon-search'
      }
    })

  })

})
