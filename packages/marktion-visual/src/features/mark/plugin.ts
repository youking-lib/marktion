import { Tokens } from 'marktion-parser'
import { Transforms } from 'slate'
import { Plugin } from '../../VisualMarktion'

export type MarkInterface = {
  insertMark: (character: string) => void
}

export const markPlugin: Plugin = ({ editor }) => {
  editor.insertMark = character => {
    const mark: Tokens.Mark = {
      type: 'mark',
      mark: character,
      children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mark as any)
    Transforms.move(editor)
  }
}
