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

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
export const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)
