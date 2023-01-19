import React from 'react'
import { useFocused, useSelected } from 'slate-react'

export const Image = ({ attributes, children, element }: any) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <span {...attributes}>
      {children}
      <span contentEditable={false} style={{ position: 'relative' }}>
        <img
          src={element.href}
          title={element.title}
          style={{
            display: 'block',
            maxWith: '100%',
            maxHeight: '20em',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
        />
      </span>
    </span>
  )
}
