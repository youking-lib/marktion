import type * as slate from 'slate'

export type Element = slate.Element & { type: string }
export type Text = slate.Text
export type Editor = slate.Editor
export type Node = Editor | Element | Text
