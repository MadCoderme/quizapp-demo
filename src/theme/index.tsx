// theme.js
import { extendTheme } from "@chakra-ui/react"

// Global style overrides
//import styles from "./styles"

// Component style overrides
import Button from './components/Button'
import CustomBadge from './components/CustomBadge'

const overrides = {
  colors: {
    razzmatazz: {
      50: "#D20057",
      100: "#D20057",
      500: "#D20057"
    },
    primary: {
      springwood: "#F6F4ED",
      springwoodLight: "#fbfaf9"
    },
    secondary: {
      silver: "#C0C0C0",
      razzmatazz: "#D20057",
      alto: "#D8D8D8",
      socialBlue: "#0033a1",
      yellow: "#FEEEB1"
    },
  },
  fonts: {
    heading: "Century Gothic Regular",
    body: "Century Gothic Regular",
  },
  // styles,
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
    CustomBadge
  },
}

export default extendTheme(overrides)