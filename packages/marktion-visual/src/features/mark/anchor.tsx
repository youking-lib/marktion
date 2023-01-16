import React, { useEffect, useState } from 'react'
import { ReactEditor } from 'slate-react'
import { BaseRange } from 'slate'
import { useEditor } from '../../hooks'

export type AnchorProps = {
  range?: BaseRange | null
}

const defaultRect = {
  top: -9999,
  left: -9999,
  height: 0,
}

export const Anchor: React.FC<AnchorProps> = ({ range }) => {
  const editor = useEditor()
  const [rect, setRect] = useState(defaultRect)

  useEffect(() => {
    if (range) {
      const domRange = ReactEditor.toDOMRange(editor, range)
      const rect = domRange.getBoundingClientRect() || defaultRect

      setRect(rect)
    } else {
      setRect(defaultRect)
    }
  }, [range])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: -1,
        top: rect.top,
        left: rect.left,
        width: 1,
        height: rect.height,
      }}
    />
  )
}
