import React from 'react'
import { Typography } from 'marktion-theme'

export function Heading({ attributes, children, element }: any) {
  if (element.depth === 1) {
    return <Typography.H1 {...attributes}>{children}</Typography.H1>
  } else if (element.depth === 2) {
    return <Typography.H2 {...attributes}>{children}</Typography.H2>
  } else if (element.depth === 3) {
    return <Typography.H3 {...attributes}>{children}</Typography.H3>
  } else if (element.depth === 4) {
    return <Typography.H4 {...attributes}>{children}</Typography.H4>
  }

  return React.createElement('h' + element.depth, attributes, children)
}
