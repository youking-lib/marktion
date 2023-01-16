import { withReact } from 'slate-react'
import { Plugin } from '../VisualMarktion'

export const react: Plugin = visualMarktion => {
  visualMarktion.editor = withReact(visualMarktion.editor)
}
