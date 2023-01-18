import React from 'react'
import { useFocused, useSelected } from 'slate-react'

export const Image = ({ attributes, children, element }: any) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: 'relative' }}>
        <img
          src={element.href}
          style={{
            display: 'block',
            maxWith: '100%',
            maxHeight: '20em',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
        />
      </div>
    </div>
  )
}
