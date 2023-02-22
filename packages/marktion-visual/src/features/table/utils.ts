import { VisualMarktion } from '../../VisualMarktion'

export function isSelectionInTable(editor: VisualMarktion['editor']) {
  const selection = editor.selection

  if (!selection?.anchor || !selection.focus) {
    return false
  }
}
