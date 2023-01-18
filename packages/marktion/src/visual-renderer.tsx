import React, { useCallback, useMemo } from 'react'
import { VisualRenderer, VisualMarktion } from 'marktion-visual'
import { Editor } from './Editor'
import { EditorState } from './model/EditorState'

type VisualProps = React.PropsWithChildren<{ editor: Editor }>

export const Visual: React.FC<VisualProps> = ({ editor, children }) => {
  const visual = useMemo(() => {
    const visual = editor.getVisualMarktion()

    visual.registeAction(VisualMarktion.ModalAction.onChange, value => {
      editor.update(EditorState.updateTokens(editor.editorState, value))
    })

    return visual
  }, [editor])

  return (
    <VisualRenderer
      visual={visual}
      editableProps={{
        onFocus: useCallback(() => {
          editor.focus()
        }, []),
        onBlur: useCallback(() => {
          editor.blur()
        }, []),
      }}
    >
      {children}
    </VisualRenderer>
  )
}
