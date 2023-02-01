import React, { useEffect } from 'react'
import { styled } from 'marktion-theme'
import { useForceUpdate } from 'marktion-share'
import { MarkFeature, SlashFeature, MarkFeatureProps } from 'marktion-visual'
import { EditorCompose } from './Editor'
import { Visual } from './visual-renderer'
import { Source } from './source-renderer'
import { EditorComposeContext } from './components/hooks'
import { ShortcutHandler } from './handlers/shortcut'

export type RendererComposeProps = React.PropsWithChildren<{
  markProps?: MarkFeatureProps
  wrapperStyle?: React.CSSProperties
  editor: EditorCompose
}>

export const RendererCompose: React.FC<RendererComposeProps> = ({ editor, wrapperStyle, markProps, children }) => {
  const forceUpdate = useForceUpdate()
  const mode = editor.editorState.getMode()

  useEffect(() => {
    editor.registeAction('onChange', forceUpdate)

    const onKeydown = (e: KeyboardEvent) => {
      ShortcutHandler.toggleMode(editor, e)
    }

    window.addEventListener('keydown', onKeydown)

    return () => {
      editor.registeAction('onChange', forceUpdate)

      window.removeEventListener('keydown', onKeydown)
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
      <RootEl className="marktion-root" style={wrapperStyle}>
        <EditorEl className="marktion-editor">
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
  fontSize: '14px',
  overflow: 'auto',
  padding: '$3',
})
