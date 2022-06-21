import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Century Gothic Regular';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/Century-Gothic-Bold.woff') format('woff'), url('./fonts/Century-Gothic-Bold.ttf') format('ttf'), url('./fonts/Century-Gothic-Bold.svg') format('svg');
      }
      /* latin */
      @font-face {
        font-family: 'Century Gothic Regular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Century-Gothic-Regular.woff') format('woff'), url('./fonts/Century-Gothic-Regular.ttf') format('ttf'), url('./fonts/Century-Gothic-Regular.svg') format('svg');
      }
      `}
  />
)
export default Fonts