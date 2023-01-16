import React, { useRef, useEffect } from 'react'
import { MarktionSource } from './MarktionSource'

export type SourceRendererProps = {
  editor: MarktionSource
}

export const SourceRenderer: React.FC<SourceRendererProps> = props => {
  const codemirrorEl = useRef(null)
  const editor = props.editor

  useEffect(() => {
    if (codemirrorEl.current) {
      editor.initEditor(codemirrorEl.current!)
    }

    return () => editor.editorView.destroy()
  }, [codemirrorEl.current])

  return <div style={{ minHeight: 100 }} ref={codemirrorEl}></div>
}
