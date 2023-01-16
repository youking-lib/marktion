import { Plugin } from '../VisualMarktion'

export type BeforeInputInterface = {
  beforeInput: (event: InputEvent) => void | boolean
}

export const beforeInput: Plugin = ({ editor }) => {
  editor.beforeInput = editor.beforeInput || function () {}
}
