import React from 'react'

export const Fences = (props: any) => {
  const { attributes, children, element } = props

  return (
    <pre {...attributes} style={{ backgroundColor: '#999' }}>
      <code>{children}</code>
    </pre>
  )
}
