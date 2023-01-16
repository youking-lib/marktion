import { ViewUpdate } from '@codemirror/view'

export enum ModelAction {
  onChange = 'onChange',
}

export type Actions = {
  [ModelAction.onChange]: {
    value: string
    viewUpdate: ViewUpdate
  }
}
