import React, { useMemo } from 'react'
import { SourceRenderer, MarktionSource } from 'marktion-source'
import { Editor } from './Editor'
import { EditorState } from './model/EditorState'

type SourceProps = { editor: Editor }

export const Source: React.FC<SourceProps> = ({ editor }) => {
  const sourceMarktion = useMemo(() => {
    const marktionSource = MarktionSource.create({
      defaultValue: editor.editorState.getSourceState().getSource(),
      language: 'markdown',
    })

    marktionSource.registeAction(MarktionSource.ModalAction.onChange, ({ value }) => {
      const nextState = EditorState.updateSource(editor.editorState, value)

      editor.update(nextState)
    })

    return marktionSource
  }, [])

  return <SourceRenderer editor={sourceMarktion}></SourceRenderer>
}
