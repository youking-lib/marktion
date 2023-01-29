import React from 'react'
import { Typography } from 'marktion-theme'

export const Fences = (props: any) => {
  const { attributes, children, element } = props

  return (
    <Typography.Pre {...attributes}>
      <Typography.Code>{children}</Typography.Code>
    </Typography.Pre>
  )
}
