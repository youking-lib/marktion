import { Editor, Location, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { Actions, TransformActions } from '../../model/actions/Actions'
import { VisualMarktion } from '../../VisualMarktion'

export const SlashHelper = {
  eraseEnhance(editor: Editor) {
    const enhance = editor.getEditEnhance()

    if (enhance) {
      const range = Editor.range(editor, enhance.anchor, editor.selection!)
      Transforms.select(editor, range)
      Transforms.insertText(editor, '')
    }
  },

  dispatch<T extends TransformActions>(visual: VisualMarktion, action: T, payload: Actions[T]) {
    visual.dispatch(action, payload)

    SlashHelper.eraseEnhance(visual.editor)
    ReactEditor.focus(visual.editor)
  },
}
