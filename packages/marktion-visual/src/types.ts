import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'
import { MarkInterface } from './features/mark/plugin'
import { BeforeInputInterface } from './plugins/beforeInput'
import { EditEnhanceInterface } from './plugins/editEnhance'
import { FormatInterface } from './plugins/format'

export type SlateEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  BeforeInputInterface &
  MarkInterface &
  EditEnhanceInterface &
  FormatInterface

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor
    Element: Element
    Text: Text
  }
}
