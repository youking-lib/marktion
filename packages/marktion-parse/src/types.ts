import { BaseEditor } from 'slate'

export type SlateText = { text: string }
export type SlateEditor = BaseEditor
export type SlateElement = {
  type: 'paragraph'
  children: SlateNode[]
}
export type SlateNode = SlateText | SlateElement
