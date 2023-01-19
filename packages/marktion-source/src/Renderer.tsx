import React, { useRef, useEffect } from 'react'
import { SourceMarktion } from './SourceMarktion'

export type SourceRendererProps = {
  editor: SourceMarktion
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
