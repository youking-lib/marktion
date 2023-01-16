import { BaseRange, Descendant } from 'slate'

export enum SlashAction {
  SlashShow = 'SlashShow',
  SlashHide = 'SlashHide',
}

export enum ModelAction {
  onChange = 'onChange',
}

export enum TransformActions {
  toHeading = 'toHeading',
  toParagraph = 'toParagraph',
}

export enum EditEnhanceActions {
  slash = 'slash',
  mention = 'mention',
  mark = 'mark',
}

export type EditEnhanceActionPayload = {
  word: string
  visible: boolean
  anchor: BaseRange
}

export type Actions = {
  [SlashAction.SlashShow]: void
  [SlashAction.SlashHide]: void
  [TransformActions.toHeading]: 1 | 2 | 3 | 4 | 5 | 6
  [TransformActions.toParagraph]: void
  [ModelAction.onChange]: Descendant[]
  [EditEnhanceActions.slash]: EditEnhanceActionPayload
  [EditEnhanceActions.mention]: EditEnhanceActionPayload
  [EditEnhanceActions.mark]: EditEnhanceActionPayload
}
