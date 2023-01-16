import { Editor, Element as SlateElement, Transforms } from 'slate'
import { Plugin } from '../VisualMarktion'

const inlineFormat = ['escape', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'mark']
const voidElement = ['hr', 'mark']

export type toggleFormatArgs = {
  heading: 1 | 2 | 3 | 4 | 5 | 6
  paragraph: void
  list: void
}

export type FormatInterface = {
  isActiveFomat: (format: keyof toggleFormatArgs) => void | boolean
  toggleFormat: <T extends keyof toggleFormatArgs>(format: T, payload?: toggleFormatArgs[T]) => void
}

export const format: Plugin = ({ editor }) => {
  const { isInline, isVoid, markableVoid } = editor

  editor.isInline = element => {
    return inlineFormat.includes(element['type']) || isInline(element)
  }

  editor.markableVoid = element => {
    return inlineFormat.includes(element['type']) || markableVoid(element)
  }

  editor.isVoid = element => {
    return voidElement.includes(element['type']) || isVoid(element)
  }

  editor.isActiveFomat = format => {
    const selection = editor.selection

    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => {
          return !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === format
        },
      }),
    )

    return !!match
  }

  editor.toggleFormat = (format, payload) => {
    let newProperties = {
      type: format,
    }

    if (format === 'heading') {
      newProperties['depth'] = payload
    }

    Transforms.setNodes<SlateElement>(editor, newProperties as any)
  }
}
