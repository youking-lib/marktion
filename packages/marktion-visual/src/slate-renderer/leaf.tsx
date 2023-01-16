import React from 'react'

export const Leaf = (props: any) => {
  const { attributes, children, leaf } = props

  switch (leaf.type) {
    case 'codespan':
      return <code {...attributes}>{children}</code>
    case 'escape':
      return <code {...attributes}>{children}</code>

    default:
      return <span {...attributes}>{children}</span>
  }
}
