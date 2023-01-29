import React from 'react'
import { Typography } from 'marktion-theme'

export const Leaf = (props: any) => {
  const { attributes, children, leaf } = props

  switch (leaf.type) {
    case 'codespan':
      return <Typography.Code {...attributes}>{children}</Typography.Code>
    case 'escape':
      return <code {...attributes}>{children}</code>
    default:
      return <span {...attributes}>{children}</span>
  }
}
