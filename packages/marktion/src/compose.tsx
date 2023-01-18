import React, { useEffect } from 'react'
import { MarkFeature, SlashFeature, MarkFeatureProps } from 'marktion-visual'
import { useHotkey, useForceUpdate } from 'marktion-share'
import { EditorCompose } from './Editor'
import { Visual } from './visual-renderer'
import { Source } from './source-renderer'
import { styled } from 'marktion-theme'
import { EditorComposeContext } from './components/hooks'
import { MarktionModifier } from './model/Modifier'

export type RendererComposeProps = React.PropsWithChildren<{
  markProps?: MarkFeatureProps
  wrapperStyle?: React.CSSProperties
  editor: EditorCompose
}>

export const RendererCompose: React.FC<RendererComposeProps> = ({ editor, wrapperStyle, markProps, children }) => {
  const forceUpdate = useForceUpdate()
  const mode = editor.editorState.getMode()

  useHotkey('cmd+/', () => {
    if (editor.editorState.getHasFocus()) {
      const nextState = MarktionModifier.toggleViewMode(editor.editorState)
      editor.update(nextState)
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
    <EditorComposeContext.Provider value={editor}>
      <RootEl className="marktion-react-root" style={wrapperStyle}>
        <EditorEl>
          {visualMarktionRenderer}
          {sourceMarktionRenderer}
        </EditorEl>
        {children}
      </RootEl>
    </EditorComposeContext.Provider>
  )
}

const RootEl = styled('div', {
  minHeight: '$9',
  height: '100%',
})

const EditorEl = styled('div', {
  height: 'calc(100% - 45px)',
  overflow: 'auto',
  paddingBottom: '$2',
})
