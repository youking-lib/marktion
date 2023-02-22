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

export enum EventActions {
  onKeydown = 'onKeydown',
  onBeforeInput = 'onBeforeInput',
}

export const ActionsChanel = {
  SlashAction,
  ModelAction,
  TransformActions,
  EditEnhanceActions,
  EventActions,
}
