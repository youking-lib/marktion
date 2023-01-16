import { BaseRange, Editor, Range } from 'slate'
import { EditEnhanceActions } from '../model/actions/Actions'
import { Plugin } from '../VisualMarktion'

export const SLASH_KEY = '/'
export const MENTION_KEY = '@'
export const MARK_KEY = '#'

export type EnhanceOptions = {
  enhance: EditEnhanceActions
  anchor: BaseRange
  word: string
}

export type EditEnhanceInterface = {
  getEditEnhance: () => EnhanceOptions | null
  disposeEditEnhance: () => void
  dispatchEditEnhance: (optons: EnhanceOptions) => void
}

const EnhanceMap = {
  [SLASH_KEY]: EditEnhanceActions.slash,
  [MENTION_KEY]: EditEnhanceActions.mention,
  [MARK_KEY]: EditEnhanceActions.mark,
}

const EnhanceReg = {
  [EditEnhanceActions.slash]: new RegExp('^/[^\\s|/]*(?=$|\\n)'),
  [EditEnhanceActions.mention]: new RegExp('^@[^\\s|@]*(?=$|\\n)'),
  [EditEnhanceActions.mark]: new RegExp('^#[^\\s|#]*(?=$|\\n)'),
}

const EditEnhanceMap = new WeakMap<Editor, EnhanceOptions>()

export const editEnhance: Plugin = visual => {
  const editor = visual.editor
  const { onChange, beforeInput } = editor

  editor.getEditEnhance = () => {
    return EditEnhanceMap.get(editor) || null
  }

  editor.beforeInput = e => {
    const { selection } = editor

    if (!selection || !Range.isCollapsed(selection)) {
      editor.disposeEditEnhance()
    } else if (!editor.getEditEnhance()) {
      const inputCharacter = e.data
      const enhance = inputCharacter && EnhanceMap[inputCharacter]

      if (enhance) {
        editor.dispatchEditEnhance({
          enhance: enhance,
          anchor: selection,
          word: inputCharacter,
        })
      }
    }

    return beforeInput(e)
  }

  editor.onChange = () => {
    const enhance = editor.getEditEnhance()
    const selection = editor.selection

    if (!selection || !Range.isCollapsed(selection)) {
      editor.disposeEditEnhance()
    } else if (enhance) {
      const after = Editor.after(editor, enhance.anchor, { unit: 'line' })
      const before = enhance.anchor
      const afterRange = before && Editor.range(editor, before, after)
      const followText = afterRange && Editor.string(editor, afterRange)
      const afterMatch = followText && followText.match(EnhanceReg[enhance.enhance])

      if (afterMatch) {
        editor.dispatchEditEnhance({
          enhance: enhance.enhance,
          anchor: enhance.anchor,
          word: afterMatch[0] || '',
        })
      } else {
        editor.disposeEditEnhance()
      }
    }

    return onChange()
  }

  editor.dispatchEditEnhance = options => {
    EditEnhanceMap.set(editor, options)

    visual.dispatch(options.enhance, {
      visible: true,
      anchor: options.anchor,
      word: options.word,
    })
  }

  editor.disposeEditEnhance = () => {
    const enhance = editor.getEditEnhance()

    if (enhance) {
      EditEnhanceMap.delete(editor)

      visual.dispatch(enhance.enhance, {
        visible: false,
        anchor: enhance.anchor,
        word: enhance.word,
      })
    }
  }
}
