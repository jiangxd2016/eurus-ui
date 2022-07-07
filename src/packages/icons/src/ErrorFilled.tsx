import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorFilled',
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="none" d="M9 10.555L10.555 9L23 21.444L21.444 23z"></path>
        <path fill="currentColor"
              d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14a13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm5.445 21L9 10.556L10.556 9L23 21.445Z"
        ></path>
      </svg>
    );
  },
});
