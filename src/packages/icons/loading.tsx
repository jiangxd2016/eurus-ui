import { defineComponent } from 'vue'
import './style.scss'
export default defineComponent({
  name: 'LoadingIcon',
  render() {
    return (
      <svg id="svg" width="100%" height="100%" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
          opacity=".5"></path>
        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 12 12"
            repeatCount="indefinite"
            to="360 12 12"
            type="rotate"></animateTransform>
        </path>
      </svg>
    )
  },
})
