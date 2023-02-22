import { BaseEditor, BaseRange, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'
import { MarkInterface } from '../features/mark/plugin'
import { EditEnhanceInterface } from '../plugins/editEnhance'
import { FormatInterface } from '../plugins/format'
import { ActionsChanel } from './actions/Actions'

export type SlateEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
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

export type EditEnhanceActionPayload = {
  word: string
  visible: boolean
  anchor: BaseRange
}

export type Actions = {
  [ActionsChanel.SlashAction.SlashShow]: void
  [ActionsChanel.SlashAction.SlashHide]: void
  [ActionsChanel.TransformActions.toHeading]: 1 | 2 | 3 | 4 | 5 | 6
  [ActionsChanel.TransformActions.toParagraph]: void
  [ActionsChanel.ModelAction.onChange]: Descendant[]
  [ActionsChanel.EditEnhanceActions.slash]: EditEnhanceActionPayload
  [ActionsChanel.EditEnhanceActions.mention]: EditEnhanceActionPayload
  [ActionsChanel.EditEnhanceActions.mark]: EditEnhanceActionPayload
  [ActionsChanel.EventActions.onKeydown]: React.KeyboardEvent<HTMLDivElement>
  [ActionsChanel.EventActions.onBeforeInput]: InputEvent
}
