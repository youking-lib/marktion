import React, { useMemo } from 'react'
import { SourceRenderer, SourceMarktion } from 'marktion-source'
import { Editor } from './Editor'
import { EditorState } from './model/EditorState'

type SourceProps = { editor: Editor }

export const Source: React.FC<SourceProps> = ({ editor }) => {
  const sourceMarktion = useMemo(() => {
    const marktionSource = editor.getSourceMarktion()

    marktionSource.registeAction(SourceMarktion.ModalAction.onChange, ({ value }) => {
      editor.update(EditorState.updateSource(editor.editorState, value))
    })

    return marktionSource
  }, [])

  return <SourceRenderer editor={sourceMarktion}></SourceRenderer>
}
