import { Editor } from 'slate'
import { SlateEditor } from '../../model/types'

export function getStringBeforeCursor(editorInput: SlateEditor) {
  const focus = editorInput.selection?.focus
  const start = Editor.start(editorInput, [])

  if (!focus) {
    return null
  }

  const str = Editor.string(editorInput, {
    anchor: start,
    focus,
  })

  return str
}
