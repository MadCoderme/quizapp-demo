import { Box, useStyleConfig } from "@chakra-ui/react"
import React from "react"

// 3. Use it in your components
export default function CustomBadge(props: any) {
  const { size, variant, ...rest } = props
  const styles = useStyleConfig("CustomBadge", { size, variant })
  return <Box as="span" sx={styles} {...rest} />
}