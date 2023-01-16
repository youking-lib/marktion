import { Editor, Transforms } from 'slate'
import { VisualMarktion } from '../../VisualMarktion'

export const MarkHelper = {
  insertMark(visual: VisualMarktion, mark: string) {
    const editor = visual.editor
    const editEnhance = editor.getEditEnhance()

    if (editEnhance) {
      const range = Editor.range(editor, editEnhance.anchor, editor.selection!)
      Transforms.select(editor, range)
    }
    editor.insertMark(mark)
  },
}
