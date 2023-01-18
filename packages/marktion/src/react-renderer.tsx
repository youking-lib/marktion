import React, { useEffect } from 'react'
import { MarkFeature, SlashFeature, MarkFeatureProps } from 'marktion-visual'
import { useHotkey, useForceUpdate } from 'marktion-share'
import { Editor } from './Editor'
import { Visual } from './visual-renderer'
import { Source } from './source-renderer'

export type ReactRendererProps = {
  markProps?: MarkFeatureProps
  wrapperStyle?: React.CSSProperties
  editor: Editor
}

export const ReactRenderer: React.FC<ReactRendererProps> = ({ editor, wrapperStyle, markProps }) => {
  const forceUpdate = useForceUpdate()
  const mode = editor.editorState.getMode()

  useHotkey('cmd+/', () => {
    if (editor.editorState.getHasFocus()) {
      editor.toggleViewMode()
    }
  })

  useEffect(() => {
    editor.registeAction('onChange', forceUpdate)

    return () => {
      editor.registeAction('onChange', forceUpdate)
    }
  }, [])

  const visualMarktionRenderer = mode === 'visual' && (
    <Visual editor={editor} markProps={markProps}>
      <SlashFeature />
      <MarkFeature {...markProps} />
    </Visual>
  )
  const sourceMarktionRenderer = mode === 'source' && <Source editor={editor} />

  return (
    <div className="marktion-react-root" style={wrapperStyle}>
      {visualMarktionRenderer}
      {sourceMarktionRenderer}
    </div>
  )
}
