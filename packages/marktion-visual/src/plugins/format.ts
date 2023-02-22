import { BaseEditor, BaseRange, Editor, Element as SlateElement, Range, Transforms } from 'slate'
import { Plugin } from '../VisualMarktion'

const inlineFormat = ['escape', 'link', 'strong', 'em', 'codespan', 'br', 'del', 'mark']
const voidElement = ['hr', 'mark', 'image']

export type toggleFormatArgs = {
  heading: 1 | 2 | 3 | 4 | 5 | 6
  paragraph: void
  list: void
  fences: void
}

export type FormatInterface = {}

export const format: Plugin = visual => {
  const editor = visual.editor
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

  editor.insertBreak = () => {
    if (EditorBehavior.atLiftNodesMode(editor)) {
      return Transforms.liftNodes(editor)
    }

    Transforms.splitNodes(editor, {
      always: true,
    })
  }
}

export const EditorBehavior = {
  atLiftNodesMode(editor: BaseEditor) {
    const selection = editor.selection

    if (selection && Range.isCollapsed(selection)) {
      const depth = Range.start(selection).path.length
      return depth > 2 && EditorRange.isAtBeginning(selection)
    }

    return false
  },
}

export const EditorRange = {
  isAtBeginning(range: BaseRange) {
    return Range.isCollapsed(range) && Range.start(range).offset === 0
  },
}

export const EditorFormat = {
  isActive(editor: Editor, format: keyof toggleFormatArgs): boolean {
    const selection = editor.selection

    if (selection) {
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

    return false
  },

  set<T extends keyof toggleFormatArgs>(editor: Editor, format: T, payload?: toggleFormatArgs[T]): void {
    let newProperties = {
      type: format,
    }

    if (format === 'heading') {
      newProperties['depth'] = payload
    }

    Transforms.setNodes<SlateElement>(editor, newProperties as any)
  },
}
