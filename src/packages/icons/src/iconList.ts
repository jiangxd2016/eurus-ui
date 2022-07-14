/* eslint-disable key-spacing */
const iconList = {
  arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10l10-10l-1.41-1.41z"></path>
      </svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16l10 10z"></path>
      </svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"></path>
      </svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M16 4L6 14l1.41 1.41L15 7.83V28h2V7.83l7.59 7.58L26 14L16 4z"></path>
      </svg>`,
  caretDown: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m24 12l-8 10l-8-10z"></path>
      </svg>`,
  caretLeft: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m20 24l-10-8l10-8z"></path>
      </svg>`,
  caretRight: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m12 8l10 8l-10 8z"></path>
      </svg>`,
  caretSort: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m24 24l-8 8l-8-8zM8 8l8-8l8 8z"></path>
      </svg>`,
  caretUp: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m8 20l8-10l8 10z"></path>
      </svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z"></path>
      </svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z"></path>
      </svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z"></path>
      </svg>`,
  chevronSort: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor"
              d="m16 28l-7-7l1.41-1.41L16 25.17l5.59-5.58L23 21l-7 7zm0-24l7 7l-1.41 1.41L16 6.83l-5.59 5.58L9 11l7-7z"
        ></path>
      </svg>`,
  chevronUp: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="m16 10l10 10l-1.4 1.4l-8.6-8.6l-8.6 8.6L6 20z"></path>
      </svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor"
              d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
        ></path>
      </svg>`,
  errorFilled: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="none" d="M9 10.555L10.555 9L23 21.444L21.444 23z"></path>
        <path fill="currentColor"
              d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14a13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm5.445 21L9 10.556L10.556 9L23 21.445Z"
        ></path>
      </svg>`,
  errorOutline: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M9 10.555L10.555 9L23 21.444L21.444 23z"></path>
        <path fill="currentColor"
              d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14a13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12.035 12.035 0 0 1-12 12Z"
        ></path>
      </svg>`,
  loading: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
          opacity=".5"
        ></path>
        <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 12 12"
            repeatCount="indefinite"
            to="360 12 12"
            type="rotate"
          ></animateTransform>
        </path>
      </svg>`,
  misuse: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor"
              d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z"
        ></path>
      </svg>`,

  star: `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">
        <path fill="currentColor" d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"></path>
      </svg>
      `,
  starFilled: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">
      <path fill="currentColor" d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"></path>
  </svg>`,
  starHalf: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32">
  <path fill="currentColor" d="M11.45 11.22L1.28 12.7l7.36 7.17L6.9 30l9.1-4.78V2l-4.55 9.22z"></path>
  </svg>`,
  upload: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z"></path></svg>
  `
};
export default iconList;